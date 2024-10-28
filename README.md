<p align="center">
<h1 align="center">Foxy Aristry</h1>
<p>A image and video generation microservice used in Foxy</p>
</p>

## What is this?
Originally launched back in 2021 to create images with text for Foxy, this service has evolved to modify images and videos for Foxy commands.

## Why Separate the Image Rendering Service from Foxy?

1. **Scalability**: 
   - We can spin up multiple instances of the image generator and spread them across different machines or containers. This makes it way easier to handle a lot of requests at once!

2. **Security**: 
   - By keeping things separate, if a troublesome image tries to crash the process, it won’t take down Foxy with it. Other features can keep running smoothly.

3. **Better Resource Management**:
   - When the rendering service is its own thing, we can fine-tune how we use resources like CPU and memory. This way, the rendering doesn’t slow down the rest of the app.

4. **Easier Maintenance**:
   - It’s way simpler to update and fix things when the rendering service is separate. We can make improvements without messing with the whole Foxy setup.

5. **Tech Flexibility**:
   - We can pick and choose the best tools and libraries for rendering images without worrying about what works for the rest of the app. More freedom to choose!

6. **Monitoring Made Simple**:
   - Having a standalone service makes it easier to keep an eye on performance and health. We can set up specific monitoring and logging just for rendering.

7. **Smoother User Experience**:
   - With everything running independently, users won’t face slowdowns or crashes caused by rendering issues. A better experience overall!
