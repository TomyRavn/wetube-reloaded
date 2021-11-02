import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 80 },
  fileUrl: { type: String, required: true },
  description: { type: String, required: true, trim: true, minlength: 20 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

//※ Mongoose Middleware 는 반드시 Model 생성 전에 생성
//=>'save'는 findByIdAndUpdate에서 작동되지 않음
//videoSchema.pre('save', async function(){
//    //this => this video
//    this.hashtags = this.hashtags[0].split(",").map(item => item.startsWith("#") ? item : `#${item}`)
//})

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const movieModel = mongoose.model("Video", videoSchema);
export default movieModel;
