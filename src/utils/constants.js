export const isFirefox = process.env.BROWSER === 'firefox'
export const isEdge = process.env.BROWSER === 'edge'

export const action = isFirefox ? chrome.browserAction : chrome.action

export const websiteUrl =
  process.env.NODE_ENV === 'development'
    ? 'https://oauth.astian.xyz'
    : 'https://oauth.astian.org'

export const backupUrl = 'https://accounts.astian.org'

/*
export const freeCredentials = {
  username: process.env.FREE_USERNAME,
  password: process.env.FREE_PASSWORD,
}
*/
export const errorCodes = { invalidToken: 1001 }

export const reviewUrl =
  (isFirefox
    ? 'https://addons.mozilla.org/firefox/addon/astianvpn/reviews'
    : isEdge
    ? ''
    : '') +
  `?hl=${chrome.i18n.getUILanguage()}`

export const localeMessageKeys = [
  'signUp',
  'login',
  'continueText',
  'username',
  'password',
  'twoFaToken',
  'loading',
  'forgotPassword',
  'connected',
  'disconnected',
  'goToOptionsPage',
  'goToLocationsPage',
  'upgradeText1',
  'upgradeText2',
  'menu',
  'account',
  'options',
  'contactUs',
  'email',
  'plan',
  'premium',
  'free',
  'editInfo',
  'logout',
  'spoofGeolocation',
  'disableWebRtc',
  'disableAddressAutofill',
  'spoofGeolocationSubTitle',
  'disableWebRtcSubTitle',
  'disableAddressAutofillSubTitle',
  'locations',
  'reviewTitle',
  'reviewSubtitle',
  'upgradeLocation',
  'au',
  'br',
  'ca',
  'cl',
  'fr',
  'de',
  'in',
  'jp',
  'kr',
  'mx',
  'nl',
  'pl',
  'ro',
  'sg',
  'es',
  'se',
  'uk',
  'use',
  'uss',
  'usw',
  'ue',
  'us',
  'uw',
  'za',
]
