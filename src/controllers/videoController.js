
export const trending = (req, res) => {
    const videos = [
        {
            title: "First Video",
            rating: 5,
            comments:2,
            createdAt: "2 minutes ago",
            views: 59,
            id: 1,
        },
        {
            title: "Second Video",
            rating: 4.2,
            comments:1,
            createdAt: "5 minutes ago",
            views: 42,
            id: 2,
        },
        {
            title: "Third Video",
            rating: 3,
            comments:5,
            createdAt: "10 minutes ago",
            views: 5,
            id: 3,
        },
    ];
    return res.render("home", { pageTitle : "Home", videos });
}
export const see = (req, res) => res.render("watch", { pageTitle : "Watch" });
export const edit = (req, res) => res.render("edit", { pageTitle : "Edit" });
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
    console.log(req.params);
    return res.send("Delete Video");
}