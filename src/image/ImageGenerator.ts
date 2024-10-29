import GostoMemeGenerator from "./generators/GostoImageGenerator";
import WindowsErrorImageGenerator from "./generators/WindowsErrorImageGenerator";
import GirlfriendImageGenerator from "./generators/GirlfriendImageGenerator";
import LaranjoImageGenerator from "./generators/LaranjoImageGenerator";
import NotStonksImageGenerator from "./generators/NotStonksImageGenerator";
import StonksImageGenerator from "./generators/StonksImageGenerator";
import ModaImageGenerator from "./generators/ModaImageGenerator";
import EminemVideoGenerator from "./generators/8MileVideoGenerator";

export default class ImageGenerator {
    private gostoImageGenerator: GostoMemeGenerator
    private windowsErrorImageGenerator: WindowsErrorImageGenerator
    private girlfriendImageGenerator: GirlfriendImageGenerator
    private laranjoImageGenerator: LaranjoImageGenerator
    private notStonksImageGenerator: NotStonksImageGenerator
    private stonksImageGenerator: StonksImageGenerator
    private modaImageGenerator: ModaImageGenerator
    private Eminem8MileVideoGenerator: EminemVideoGenerator

    constructor() {
        this.gostoImageGenerator = new GostoMemeGenerator();
        this.windowsErrorImageGenerator = new WindowsErrorImageGenerator();
        this.girlfriendImageGenerator = new GirlfriendImageGenerator();
        this.laranjoImageGenerator = new LaranjoImageGenerator();
        this.notStonksImageGenerator = new NotStonksImageGenerator();
        this.stonksImageGenerator = new StonksImageGenerator();
        this.modaImageGenerator = new ModaImageGenerator();
        this.Eminem8MileVideoGenerator = new EminemVideoGenerator();
    }

    generateGostoMeme(image1: string, image2: string, text: string): Promise<Buffer> {
        return this.gostoImageGenerator.generateImage(image1, image2, text);
    }

    generateWindowsErrorImage(errorText: string): Promise<Buffer> {
        return this.windowsErrorImageGenerator.generateImage(errorText);
    }

    generateGirlfriendImage(avatarUrl): Promise<Buffer> {
        return this.girlfriendImageGenerator.generateImage(avatarUrl);
    }

    generateLaranjoImage(text: string): Promise<Buffer> {
        return this.laranjoImageGenerator.generateImage(text);
    }

    generateNotStonksImage(text: string): Promise<Buffer> {
        return this.notStonksImageGenerator.generateImage(text);
    }

    generateStonksImage(text: string): Promise<Buffer> {
        return this.stonksImageGenerator.generateImage(text);
    }

    generateModaImage(image: string): Promise<Buffer> {
        return this.modaImageGenerator.generateImage(image);
    }

    generate8MileVideo(audio: string, contentType: string, size: number): Promise<Buffer> {
        return this.Eminem8MileVideoGenerator.generateVideo(audio, contentType, size);
    }
}