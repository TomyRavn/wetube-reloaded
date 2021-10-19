import Video from "../models/Video";

export const home = async(req, res) => {
    //1. call back
    //Video.find({}, (error, videos/*== documents */) => {
    //if(error) return res.render("server-error");
    //return res.render("home", {pageTitle: "Home", videos})
    //});

    //2. Promise
    try{
        const videos = await Video.find({});
        console.log(videos);
        return res.render("home", { pageTitle : "Home", videos });
    } catch(error) {
        return res.render("server-error", {error});
    }
};
export const watch = (req, res) => {
    // const id = req.params.id;

    //ES6
    const { id } = req.params;
    return res.render("watch", { pageTitle : `Watching` });
};
export const getEdit = (req, res) => {
    const { id } = req.params;
    return res.render("edit", { pageTitle : `Editing` });
};
export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;             //const title = req.body.title;

    return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: "Upload Video"});
};
export const postUpload = async (req, res) => {
    const { title, description, hashtags } = req.body;

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
    try{
        await Video.create({
            title,
            description,
            hashtags: hashtags.split(",").map(item => item.indexOf("#") == -1 ? `#${item}` : item),
        });
        return res.redirect("/");
    } catch(error) {
        return res.render("upload", {
            pageTitle: "Upload Video",
            errorMessage: error._message,
        });
    }

   
};