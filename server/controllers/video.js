const Video = require("../models/Video.js");
const User = require("../models/User.js");
const CustomError = require("../helpers/error/CustomError.js");

// Turkish Explanations
const addVideo = async (req, res, next) => {
  /* Yeni video oluştururken içine istek gövdesi gönderilecek fakat bir de userId'si olacak.*/
  try {
    const newVideo = await Video.create({
      userId: req.user.id,
      title: req.body.title,
      desc: req.body.description,
      imgUrl: `http://localhost:5000/images/${req.savedImage}`,
      videoUrl: `http://localhost:5000/videos/${req.savedVideo}`,
    });

    await newVideo.save();
    res.status(200).json("Video has been updated!");
  } catch (err) {
    next(err);
  }
};

const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return next(new CustomError("User not found", 404));
    }

    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedVideo);
    } else {
      return next(new CustomError("You can update only your video", 404));
    }
  } catch (err) {
    next(err);
  }
};

const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return next(new CustomError("User not found", 404));
    }
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("Video has been deleted");
    } else {
      return next(new CustomError("You can delete only your video", 404));
    }
  } catch (err) {
    next(err);
  }
};

const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

const getVideosByUser = async (req, res, next) => {
  const id = req.params.id;
  try{
    const userVideos = await Video.find({userId: id});
    res.status(200).json(userVideos);
  }catch(err){
    next(err)
  }
}

const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json("The view has been increased");
  } catch (err) {
    next(err);
  }
};

const random = async (req, res, next) => {
  /* Random videolar getirmek istiyoruz. MongoDB'de agregasyon işlemleri denilince dökümanların belli alanlara göre gruplandırılması 
   ve bu gruplar yardımı ile bazı filtreleme ya da hesaplama işlemlerinin yapılmasını anlıyoruz */
  try {
    /* Rastgele videolar gelecek ve maksimum 40 video gelecek. */
    /* $sample
   Girilen belgelerden belirtilen sayıda belgeyi rastgele seçer. Sample örnek demektir, size boyut demektir. Size'in değeri pozitif sayı olmak zorundadır.
   {$sample: {size: 40}} 
 */
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

const smallRandom = async (req, res, next) => {
  try {
    /* Maksimum 40 video gelecek rastgele şekilde.
    {$sample: {size: 40}} 
    */
    const videos = await Video.aggregate([{ $sample: { size: 10 } }]);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

const trend = async (req, res, next) => {
  /* Trend videolar sort (sıralama) algoritmasıyla getirilecek. sort() ile 1 en az izlenen videoları getirir, -1 en çok izlenen videoları getirir. */
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

const sub = async (req, res, next) => {
  /* Abone olunmuş kanalların videolarını listeleyeceğiz. */
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    /* Bir liste oluşturacağım ve bir Promise kullanacağım. Kanalların tüm videoları alınacak. */
    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );
    /* Javascript Sorting Algoritması */
    /* Cevap olarak iki kere [[]] array dönmesini flat() engeller.
    /* En yeni videoları sıralar.
    */
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

const getByTag = async (req, res, next) => {
  /* Video modelinde tag satırı bir arraydir. Taglara göre videolar getirilecektir. Express query kullanarak sorgumuzu gerçekleştireceğiz. 
   Split metodu ile query'den gelen aramalar ayrılacak. Aradaki virgüller kullanılarak birbirlerinden ayrılacaklar -> ['python', 'java']
  */
  const tags = req.query.tags.split(",");

  try {
    /* $in metodu tags bilgisini tags arrayi içinde aratır. "limit" fonksiyonu en fazla gelecek döküman sayısını belirtir. */
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

const search = async (req, res, next) => {
  /* Title bilgisine göre videolar getirilecek. 
   Fakat title bilgisi çok uzun olabilir = "Node.js ile API". Bunun için regex kullanacağız.
   $regex: query, $options: "i" ise büyük küçük harf duyarlılığını temsil eder.
   */
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  getVideosByUser,
  addView,
  trend,
  random,
  smallRandom,
  sub,
  getByTag,
  search,
};
