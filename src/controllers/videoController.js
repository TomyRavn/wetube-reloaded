import Video from "../models/Video";
import User from "../models/User";

export const home = async (req, res) => {
  //1. call back
  //Video.find({}, (error, videos/*== documents */) => {
  //if(error) return res.render("server-error");
  //return res.render("home", {pageTitle: "Home", videos})
  //});

  //2. Promise
  try {
    const videos = await Video.find({})
      .sort({ createdAt: "desc" })
      .populate("owner");
    return res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    return res.status(400).render("server-error", { error });
  }
};
export const watch = async (req, res) => {
  // const id = req.params.id;
  //ES6
  const { id } = req.params;
  const video = await (await Video.findById(id)).populate("owner");
  if (!video)
    return res.status(404).render("404", { pageTitle: "Video not found." });
  return res.render("watch", { pageTitle: video.title, video });
};
export const getEdit = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video)
    return res.status(404).render("404", { pageTitle: "Video not found." });
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "You are not the owner of the video.");
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};
export const postEdit = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { id } = req.params;
  const { title, description, hashtags } = req.body;

  //const video = await Video.exists({ _id: id }); //Error 검출만을 위함
  const video = await Video.findById(id);

  if (!video)
    return res.status(404).render("404", { pageTitle: "Video not found." });
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  ////////////////////////  Edit  ////////////////////////
  //1.
  //video.title = title;
  //video.description = description;
  //video.hashtags = hashtags
  //    .split(",")
  //    .map( (word) => (word.startsWith("#") ? word : `#${word}`) );
  //await video.save();

  //2
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  //////////////////////// End of Edit ////////////////////////

  req.flash("success", "Changes saved.");
  return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};
export const postUpload = async (req, res) => {
  //const file = req.file;
  //=> ES6
  const { video, thumb } = req.files;
  const { title, description, hashtags } = req.body;
  const {
    user: { _id },
  } = req.session;

  //1. Save
  // const video = new Video({
  //     title,
  //     description,
  //     createdAt: Date.now(),
  //     hashtags: hashtags.split(",").map(item => item.indexOf("#") == -1 ? `#${item}` : item),
  //     meta: {
  //         views: 0,
  //         rating: 0,
  //     },
  // });
  // await video.save();

  //2.
  try {
    const newVideo = await Video.create({
      title,
      description,
      //fileUrl: file.path,
      //=> ES6
      fileUrl: video[0].path.replace(/[\\]/g, "/"),
      thumbUrl: thumb[0].path.replace(/[\\]/g, "/"),
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
export const deleteVideo = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video)
    return res.status(404).render("404", { pageTitle: "Video not found." });
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};
export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];

  if (keyword) {
    videos = await Video.find({
      title: {
        //By mongoDB
        $regex: new RegExp(keyword, "i"),
        //$regex: new RegExp(`^${keyword}$`, "i"),
      },
    }).populate("owner");
  }

  return res.render("search", { pageTitle: "Search", videos });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200); //ok
};
