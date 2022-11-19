const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CustomError = require("../helpers/error/CustomError.js");

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
    });

    await user.save();
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    return next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    /* Kullanıcının girdiği name bilgisine göre veritabanında arama yapılır, name bilgisi eşleşirse geriye o name'in bilgileri döner */
    const user = await User.findOne({ email: req.body.email });
    /* Name bilgisi bulunamadıysa hata döner.*/
    if (!user) {
      return next(new CustomError("No user with this email.", 400));
    }
    /* Bulunduysa şifre karşılaştırması yapar */
    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) {
      return next(
        new CustomError("Please try again to enter your password.", 400)
      );
    }

    /* const {password, ...others} = user; parolanın response olarak dönmemesi için user objesinden şifre ve diğerlerini parçalar. */
    /* const token = jwt.sign() kullanıcı bilgilerine göre bir token oluşturur. */
    const token = await jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET_KEY
    );

    const { password, email, blocked, createdAt, updatedAt, __v, ...others } =
      user._doc;

    /* res.cookie("access_token", token) tokeni access_token adıyla cookie'ye gönderir. Cookie'yi gönderebilmek için cookieParser() kullanılır (index.js); */
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(
          Date.now() + parseInt(process.env.JWT_COOKIE) * 1000 * 60 * 60 * 24
        ),
        secure: process.env.NODE_ENV === "development" ? false : true,
      })
      /* Son olarak JSON objesi olarak others._doc gönderilir.*/
      .json(others);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  signup,
  signin,
};
