export const ImageConstants = {
    GOSTO_IMAGE: `https://cakey.foxybot.win/assets/commands/memes/naosomosiguais.png`,
    GIRLFRIEND_IMAGE: `https://cakey.foxybot.win/assets/commands/memes/namorada.png`,
    WINDOWS_ERROR_IMAGE: `https://cakey.foxybot.win/assets/commands/memes/windows.png`,
    LARANJO_IMAGE: `https://cakey.foxybot.win/assets/commands/memes/laranjo.png`,
    NOT_STONKS_IMAGE: `https://cakey.foxybot.win/assets/commands/memes/notstonks.png`,
    STONKS_IMAGE: `https://cakey.foxybot.win/assets/commands/memes/stonks.png`,
    MODA_IMAGE: `https://cakey.foxybot.win/assets/commands/memes/moda.png`,
    EMINEM_VIDEO: `https://cakey.foxybot.win/assets/commands/memes/8mile.mp4`,

        /* ---- [Profile Images] ---- */
        PROFILE_BACKGROUND(backgroundId: string) {
            return `https://cakey.foxybot.win/backgrounds/${backgroundId}`;
        },
        PROFILE_LAYOUT(layoutId: string) {
            return `https://cakey.foxybot.win/layouts/${layoutId}`;
        },
        PROFILE_DECORATION(maskId: string) {
            return `https://cakey.foxybot.win/masks/${maskId}`;
        },
        MARRIED_OVERLAY(layoutId: string) {
            return `https://cakey.foxybot.win/assets/layouts/${layoutId}-married.png`;
        },
        PROFILE_BADGES(badgeId: string) {
            return `https://cakey.foxybot.win/assets/badges/${badgeId}`;
        },
};