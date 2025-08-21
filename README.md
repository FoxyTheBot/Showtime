<p align="center">
  <h1 align="center">✨ Showtime ✨</h1>
  <p>A microservice for image and video generation used by Foxy</p>
</p>

## What is this?
Originally launched in 2021 to create images with text for Foxy, this service has evolved to modify images and videos for Foxy’s commands.

## Why Separate the Image Rendering Service from Foxy?

1. **Scalability**:  
   - We can spin up multiple instances of the image generator and spread them across different machines or containers, making it much easier to handle a large number of requests simultaneously.

2. **Security**:  
   - By separating the rendering process, even if a faulty image crashes the service, it won’t affect the rest of Foxy. Other features can continue running smoothly.

3. **Better Resource Management**:  
   - With the rendering as a dedicated service, we can fine-tune CPU and memory usage, ensuring that rendering tasks don’t impact the rest of the application.

4. **Easier Maintenance**:  
   - It's much simpler to update and maintain the rendering service independently, allowing us to make improvements without disrupting the entire Foxy setup.

5. **Tech Flexibility**:  
   - We have the freedom to use the best tools and libraries for image and video rendering without worrying about compatibility with the rest of the app.

6. **Simplified Monitoring**:  
   - A standalone service makes it easier to track performance and health. We can set up specific monitoring and logging for rendering tasks.

7. **Smoother User Experience**:  
   - Running services independently ensures that users don’t experience slowdowns or crashes caused by rendering issues, delivering a better overall experience.

## Prerequisite: Install FFmpeg  
To host this service, make sure FFmpeg is installed on your machine. It's required for processing videos. You can download and install it from the [official FFmpeg website](https://ffmpeg.org/download.html). Ensure the `ffmpeg` binary is accessible from the command line to allow the service to function correctly.
