/* Intrinsic pixel sizes of the images the components render, so every <img> carries
   width and height and the browser reserves its box before the file arrives (no layout
   shift). CSS still decides the displayed size: index.css sets img { height: auto }.
   Regenerate when an image in public/ is replaced:
   sips -g pixelWidth -g pixelHeight public/<path> */
const sizes: Record<string, [number, number]> = {
  "/fever-icon.png": [295, 295],
  "/fever-logo.png": [620, 235],
  "/imagen_perfil/mario-avatar.png": [880, 880],
  "/magnific/chronicles-bone.png": [305, 157],
  "/magnific/freepik-magnific.png": [303, 157],
  "/magnific/gpt-2.png": [304, 157],
  "/magnific/kling-3-4k.png": [304, 157],
  "/magnific/multi-reference.png": [305, 157],
  "/magnific/notifications-panel.png": [367, 1276],
  "/magnific/pixverse-v6.png": [303, 157],
  "/magnific/seedance-1080p.png": [304, 157],
  "/magnific/wan-2-7.png": [304, 157],
  "/work-samples/01-event-cabaret.png": [406, 1132],
  "/work-samples/02-event-neon.png": [411, 1141],
  "/work-samples/03-event-jury.png": [431, 1146],
  "/work-samples/04-event-wcib.png": [407, 1140],
  "/work-samples/05-event-ditd.png": [403, 1120],
  "/work-samples/06-onboarding-email.png": [794, 5297],
  "/work-samples/07-onboarding-club.png": [1051, 3964],
  "/work-samples/08-purchase-candlelight.png": [540, 2639],
  "/work-samples/09-reminder-qr.png": [406, 1432],
  "/work-samples/10-churn-winback.png": [402, 498],
  "/work-samples/11-loyalty-points.png": [396, 1610],
  "/work-samples/12-newsletter-movies.png": [402, 1827],
  "/work-samples/13-reactivation-bridgerton.png": [367, 904],
  "/work-samples/14-giftcard.png": [602, 886],
  "/work-samples/15-abandoned-cart.png": [428, 1121],
  "/work-samples/16-reminder-qr.png": [404, 1118],
  "/work-samples/17-reviews-candlelight.png": [939, 2276],
  "/bark/email-approved.png": [600, 813],
  "/bark/email-draft.png": [600, 1124],
};

/** width/height props for an <img>, or nothing when the size is not known. */
export function imgSize(src: string): { width?: number; height?: number } {
  const s = sizes[src];
  return s ? { width: s[0], height: s[1] } : {};
}
