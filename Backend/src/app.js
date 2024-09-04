import express from 'express'
import cors from 'cors'
import cookiesParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "20kb" }))
// app.use(express.json())

app.use(express.urlencoded({ extended: true ,limit: "20kb" }))
// app.use(express.urlencoded())

app.use(express.static("public"))

app.use(cookiesParser())


// import routes
import userRoutes from './routes/user.routes.js'
import videoRoutes from './routes/video.routes.js'
import playlistRoutes from './routes/playlist.routes.js'
import tweetRoutes from './routes/tweet.routes.js'
import commentRoutes from './routes/comment.routes.js'


// routes declarations
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/video", videoRoutes)
app.use("/api/v1/playlist", playlistRoutes)
app.use("/api/v1/tweet", tweetRoutes)
app.use("/api/v1/comment", commentRoutes)


export { app }