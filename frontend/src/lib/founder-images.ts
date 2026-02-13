/**
 * Chiranjeevi founder page images.
 * Uses Wikimedia Commons (CC/licensed) so images load without local files.
 * Replace with your own /public images when available.
 */

const WIKIMEDIA = "https://upload.wikimedia.org/wikipedia/commons";

export const founderImages = {
  /** Main portrait – Chiranjeevi at event (585×881) */
  portrait:
    `${WIKIMEDIA}/2/2a/Chiranjeevi_at_Amitabh_Bachchan%27s_70th_birthday_celebration.jpg`,
  /** Alternate – welcome gesture (468×356) */
  welcome: `${WIKIMEDIA}/9/9d/Chiranjeevi_welcome01.jpg`,
  /** Padma Bhushan ceremony – President Kalam with Chiranjeevi (2140×1512) */
  padmaBhushan:
    `${WIKIMEDIA}/5/5a/The_President%2C_Dr._A.P.J._Abdul_Kalam_presenting_Padma_Bhushan_to_Shri_Konidala_Chiranjeevi%2C_a_well_known_cine_actor_and_philanthropist%2C_at_investiture_ceremony_in_New_Delhi_on_March_29%2C_2006.jpg`,
  /** Birthday event – cropped portrait (285×370) */
  portraitCropped:
    `${WIKIMEDIA}/4/4c/Chiranjeevi_at_Amitabh_Bachchan%27s_70th_birthday_celebration_%28cropped%29.jpg`,
  /** With Salman Khan and Ram Charan – 60th birthday (382×220) */
  birthdayBash:
    `${WIKIMEDIA}/f/fb/Chiranjeevi_with_Salman_Khan_and_his_son_Ram_Charan_at_his_60th_Birthday_Bash.jpg`,
};

/** Carousel: portrait-style images only so each thumbnail shows Chiranjeevi clearly (no wide ceremony crop). */
export const founderCarouselImages = [
  founderImages.portrait,
  founderImages.welcome,
  founderImages.portraitCropped,
  founderImages.birthdayBash,
  founderImages.portrait, // 5th slot: reuse main portrait for consistency
];

/** Default image for hero, intro, biography, speeches. Use portrait so images load without local file. */
export const defaultFounderImage = founderImages.portrait;
