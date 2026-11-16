import './style.css'
import { $$ } from './lib.js'
import { initI18n } from './i18n.js'
import { initHero } from './hero.js'
import { initMyths } from './myths.js'
import { initVariables } from './variables.js'
import { initModalities } from './modalities.js'
import { initMethod } from './method.js'
import { initMarcus } from './marcus.js'
import { initDeck } from './deck.js'
import { initFaq } from './faq.js'
import { initContact } from './contact.js'
import { initNav } from './nav.js'
import { initAltimetry } from './altimetry.js'

const ARROW = '<svg class="arr" width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12L12 4M5 4h7v7"/></svg>'

// textos fixos do HTML primeiro: as seções abaixo geram o resto já no idioma certo
initI18n()
initMyths()
initVariables()
initModalities()
initMethod()
initMarcus()
initDeck()
initFaq()
initContact()
// setas depois de todo o HTML gerado existir
$$('i[data-arr]').forEach((i) => i.replaceWith(Object.assign(document.createElement('span'), { innerHTML: ARROW }).firstChild))
initNav()
initHero()
initAltimetry()
