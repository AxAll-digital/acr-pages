// =============================================================================
// translations.js — AxAll ACR & Statement pages
// Edit this file to update UI labels and translations.
// Do not edit index.html or acr.html for translation changes.
//
// Structure:
//   SHARED HELPERS     — 1. Field resolver (used by both pages)
//   ACR HELPERS        — 2. Conformance label map
//                        3. EN 301 549 clause section labels
//                        4. EN 301 549 cross-reference term translations
//   STATEMENT HELPERS  — 5. Compliance status label map
//                        6. Applicable Directive label map
//   UI STRINGS         — all display text, grouped as: SHARED → ACR → STATEMENT
// =============================================================================

// =============================================================================
// SHARED HELPERS
// =============================================================================

// -----------------------------------------------------------------------------
// 1. Field resolver
// Returns LT value if lang === 'lt' and LT value is non-empty.
// Falls back to EN value. Never returns blank if EN exists.
// -----------------------------------------------------------------------------
function langField(enValue, ltValue, lang) {
  if (lang === 'lt' && ltValue && ltValue.trim() !== '') {
    return ltValue;
  }
  return enValue || '';
}

// =============================================================================
// ACR HELPERS
// =============================================================================

// -----------------------------------------------------------------------------
// 2. Conformance level label map
// Maps Airtable EN conformance values → translated UI label
// -----------------------------------------------------------------------------
function conformanceLabel(raw, t) {
  const map = {
    'Supports':           t.supports,
    'Partially Supports': t.partiallySup,
    'Does Not Support':   t.doesNotSup,
    'Not Applicable':     t.notApplicable,
    'Not Evaluated':      t.notEvaluated,
  };
  return map[raw] || raw;
}

// -----------------------------------------------------------------------------
// 3. EN 301 549 Clause section labels
// Keys must match exactly the single select option names in Airtable.
// -----------------------------------------------------------------------------
const clauseLabels = {
  en: {
    '4 - Functional Performance Statements (FPS)':              '4 - Functional Performance Statements (FPS)',
    '5 - Generic Requirements':                                 '5 - Generic Requirements',
    '6 - ICT with Two-Way Voice Communication':                 '6 - ICT with Two-Way Voice Communication',
    '7 - ICT with Video Capabilities':                         '7 - ICT with Video Capabilities',
    '8 - Hardware':                                             '8 - Hardware',
    '9 - Web':                                                  '9 - Web',
    '10 - Non-Web Documents':                                   '10 - Non-Web Documents',
    '11 - Software':                                            '11 - Software',
    '12 - Documentation and Support Services':                  '12 - Documentation and Support Services',
    '13 - ICT Providing Relay or Emergency Service Access':     '13 - ICT Providing Relay or Emergency Service Access',
    'Annex A':                                                  'Annex A',
    'Annex B':                                                  'Annex B',
    'Annex C':                                                  'Annex C',
  },
  lt: {
    '4 - Functional Performance Statements (FPS)':              '4 - Funkcinių charakteristikų aprašymai (FPS)',
    '5 - Generic Requirements':                                 '5 - Bendrieji reikalavimai',
    '6 - ICT with Two-Way Voice Communication':                 '6 - IRT su dvipusio balso ryšio priemonėmis',
    '7 - ICT with Video Capabilities':                         '7 - IRT, galinčios apdoroti ir rodyti vaizdo turinį',
    '8 - Hardware':                                             '8 - Aparatinė įranga',
    '9 - Web':                                                  '9 - Saitynas',
    '10 - Non-Web Documents':                                   '10 - Elektroniniai dokumentai',
    '11 - Software':                                            '11 - Programinė įranga',
    '12 - Documentation and Support Services':                  '12 - Dokumentacija ir pagalbos paslaugos',
    '13 - ICT Providing Relay or Emergency Service Access':     '13 - IRT, palaikančios ryšio tarpininkavimo ir skubiosios pagalbos paslaugas',
    'Annex A':                                                  'Priedas A',
    'Annex B':                                                  'Priedas B',
    'Annex C':                                                  'Priedas C',
  },
};

function clauseLabel(raw, lang) {
  return (clauseLabels[lang] && clauseLabels[lang][raw]) || raw;
}

// -----------------------------------------------------------------------------
// 4. EN 301 549 cross-reference bracketed term translations
// Used in "Also applies to" lists: "9.1.1.1 (Web)" → "9.1.1.1 (Saitynas)"
// Keys must match exactly the terms in parentheses in Airtable EN ref field
// -----------------------------------------------------------------------------
const enRefTerms = {
  en: {},
  lt: {
    'Web':                           'Saitynas',
    'Non-web document':              'E. dokumentai',
    'Open Functionality Software':   'Atviros funkcijos programinė įranga',
    'Closed Software':               'Uždaros funkcijos programinė įranga',
    'Closed Functionality Software': 'Uždaros funkcijos programinė įranga',
    'Authoring Tool':                'Turinio kūrimo įrankis',
    'Product Docs':                  'Produkto dokumentacija',
    'Support Docs':                  'Pagalbos dokumentacija',
  },
};

function translateEnRef(text, lang) {
  if (!text || lang === 'en') return text;
  const terms = enRefTerms[lang] || {};
  return text.replace(/\(([^)]+)\)/g, (match, term) => {
    return terms[term] ? `(${terms[term]})` : match;
  });
}

function enRefLabel(lang) {
  return lang === 'lt' ? 'Taip pat taikoma EN 301 549 kriterijams:' : 'Also applies to EN 301 549 Criteria:';
}

// =============================================================================
// STATEMENT HELPERS
// =============================================================================

// -----------------------------------------------------------------------------
// 5. Compliance status label map
// -----------------------------------------------------------------------------
const complianceLabels = {
  en: {
    'Fully Compliant':     'Compliant',
    'Partially Compliant': 'Partially compliant',
    'Non-Compliant':       'Non-compliant',
  },
  lt: {
    'Fully Compliant':     'Atitinka',
    'Partially Compliant': 'Iš dalies atitinka',
    'Non-Compliant':       'Neatitinka',
  },
};

function complianceLabel(raw, lang) {
  return (complianceLabels[lang] && complianceLabels[lang][raw]) || raw;
}

// -----------------------------------------------------------------------------
// 6. Applicable Directive label map
// -----------------------------------------------------------------------------
const directiveLabels = {
  en: {
    'Directive (EU) 2019/882 on the accessibility requirements for products and services (European Accessibility Act, EAA)':
      'Directive (EU) 2019/882 on the accessibility requirements for products and services (European Accessibility Act, EAA)',
    'Directive (EU) 2016/2102 on the accessibility of the websites and mobile applications of public sector bodies (Web Accessibility Directive, WAD)':
      'Directive (EU) 2016/2102 on the accessibility of the websites and mobile applications of public sector bodies (Web Accessibility Directive, WAD)',
  },
  lt: {
    'Directive (EU) 2019/882 on the accessibility requirements for products and services (European Accessibility Act, EAA)':
      'Direktyva (ES) 2019/882 dėl gaminių ir paslaugų prieinamumo reikalavimų (European Accessibility Act, EAA)',
    'Directive (EU) 2016/2102 on the accessibility of the websites and mobile applications of public sector bodies (Web Accessibility Directive, WAD)':
      'Direktyva (ES) 2016/2102 dėl viešojo sektoriaus institucijų interneto svetainių ir mobiliųjų programų prieinamumo (Web Accessibility Directive, WAD)',
  },
};

function directiveLabel(raw, lang) {
  return (directiveLabels[lang] && directiveLabels[lang][raw]) || raw;
}

// =============================================================================
// UI STRINGS — grouped as: SHARED → ACR → STATEMENT
// Add new keys here; use t.keyName in templates.
// =============================================================================
const UI = {
  en: {

    // ── SHARED ───────────────────────────────────────────────────────────────
    // Page titles
    pageTitle:              'Accessibility Conformance Report',
    statementTitle:         'Accessibility Statement',
    htmlLang:               'en',

    // Conformance level labels (ACR tables)
    supports:               'Supports',
    partiallySup:           'Partially Supports',
    doesNotSup:             'Does Not Support',
    notApplicable:          'Not Applicable',
    notEvaluated:           'Not Evaluated',

    // Common field labels
    contactInfo:            'Contact Information',
    productDescription:     'Product Description',
    evaluators:             'Evaluators',
    leadEvaluator:          'Lead Evaluator',
    disabilityReviewer:     'Disability Reviewer',
    organisation:           'Organisation',
    disability:             'Disability',
    version:                'Version',
    learnMore:              'Learn more',

    // ── ACR ──────────────────────────────────────────────────────────────────
    // Header
    reportSubtitle:         'Edition',
    vpatEditionNote:        'Based on VPAT® 2.5 Rev',
    preparedBy:             'Prepared by',

    // Section headings
    nameOfProduct:          'Name of Product/Version',
    reportDate:             'Report Date',
    notesLabel:             'Notes',
    scopeSection:           'Evaluation Scope',
    evaluationSection:      'Evaluation',
    evalMethodsUsed:        'Evaluation Methods Used',
    assistiveTech:          'Assistive Technologies Used',
    automatedTools:         'Automated Tools Used',
    methodology:            'Evaluation Methodology',
    tools:                  'Tools, Techniques and Other Details',
    coverage:               'Evaluation Coverage',
    applicableStandards:    'Applicable Standards/Guidelines',
    standardsIntro:         'This report covers the degree of conformance for the following accessibility standard/guidelines:',
    termsSection:           'Terms',
    termsIntro:             'The terms used in the Conformance Level information are defined as follows:',
    legalDisclaimer:        'Legal Disclaimer',
    legalDisclaimerDefault: '© {year} {company}. This report reflects the accessibility status of {product} as of the evaluation date indicated above, prepared in accordance with ITI {vpat} Edition. {company} cannot guarantee that information in this report will remain accurate following the date of publication. Any modification, update, or customisation to {product} may affect the accuracy or applicability of this report. This report is provided for informational purposes only.\n\nAxall UAB confirms that the evaluation results accurately reflect the condition of {product} as evaluated within the scope and on the date defined in this report. If {product} is modified after the evaluation date, or if this report is altered by any party other than Axall UAB, Axall UAB cannot be held responsible for the accuracy of the findings presented herein. It is recommended that this report be reviewed following any significant product changes, and at minimum annually.',

    // Table headers
    thCriteria:             'Criteria',
    thConformance:          'Conformance Level',
    thRemarks:              'Remarks and Explanations',
    thStandard:             'Standard/Guideline',
    thIncluded:             'Included In Report',
    thLevel:                'Level',
    yesLabel:               'Yes',
    noLabel:                'No',

    // Terms definitions
    termSupports:           'Supports',
    termSupportsDesc:       'The functionality of the product has at least one method that meets the criterion without known defects or meets with equivalent facilitation.',
    termPartiallySup:       'Partially Supports',
    termPartiallySupDesc:   'Some functionality of the product does not meet the criterion.',
    termDoesNotSup:         'Does Not Support',
    termDoesNotSupDesc:     'The majority of product functionality does not meet the criterion.',
    termNotApplicable:      'Not Applicable',
    termNotApplicableDesc:  'The criterion is not relevant to the product.',
    termNotEvaluated:       'Not Evaluated',
    termNotEvaluatedDesc:   'The product has not been evaluated against the criterion. This can be used only in WCAG 2.x Level AAA.',

    // Notes
    noteWcagSupports:       'Note: In WCAG tables, the conformance level is marked as "Supports" even when the product does not include content covered by the success criterion. This approach aligns with <a href="https://www.w3.org/TR/WCAG20/#conformance-reqs" target="_blank" rel="noopener">WCAG 2.0 Conformance Requirements</a>.',
    noteWcagVerified:       'Note: Criteria marked as "Supports" indicate that the product\'s conformance has been determined through evaluations using the <a href="#evaluation">testing methods described above</a>.',
    noteEnNotApplicable:    'Note: In EN 301 549 tables, "Not Applicable" is used in cases where a specific function related to the criterion is not part of the product. For example, if the product is Web, all criteria from Chapter 8: Hardware of EN 301 549 will be marked as "Not Applicable." This aligns with the <a href="https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf" target="_blank" rel="noopener">EN 301 549 Conformance Requirements</a>.',

    // WCAG report
    wcagReport:             'WCAG 2.x Report',
    wcagReportIntro:        'Tables 1 and 2 document conformance with the following criteria from EN 301 549:',
    wcagReportClauses:      '<li>Clause 9 — Web</li><li>Clauses 10.1–10.4 of Clause 10 — Non-web documents</li><li>Clauses 11.1–11.4 and 11.8.2 of Clause 11 — Software</li><li>Clauses 12.1.2 and 12.2.4 of Clause 12 — Documentation and support services</li>',
    wcagReportNote:         'Note: When reporting on conformance with the WCAG 2.x Success Criteria, they are scoped for full pages, complete processes, and accessibility-supported ways of using technology as documented in the <a href="https://www.w3.org/TR/WCAG20/#conformance-reqs" target="_blank" rel="noopener">WCAG 2.0 Conformance Requirements</a>.',
    tableLevelA:            'Table 1: Success Criteria, Level A',
    tableLevelAA:           'Table 2: Success Criteria, Level AA',

    // EN 301 549 report
    enReport:               'EN 301 549 Report',
    enClauseLabel:          'Clause',

    // Eval intro sentences ({specialist}, {count}, {word}, {title}, {section} are placeholders)
    evalIntroWithScope:     'This conformance report is based on the results of an accessibility evaluation conducted by {specialist}, which included a sample of {count} {word}. These {word} were selected by AxAll UAB as representative of the overall accessibility and functionality of the {title}. The {word} are listed below in the section "{section}".',
    evalIntroNoScope:       'This conformance report is based on the results of an accessibility evaluation conducted by {specialist}.',

    // ACR footer
    backToStatement:        'Back to Accessibility Statement',
    viewFullReport:         'View Full Conformance Report',

    // ── STATEMENT ─────────────────────────────────────────────────────────────
    // Intro
    introAppliesTo:         'This accessibility statement applies to the following digital services:',
    introWebsite:           'Website',
    introApp:               'Mobile application',
    introDocs:              'Non-Web Documents: published electronic documents',
    introReferredAs:        'further referred to as',
    introCollective:        'the digital services',
    introProvidedBy:        'These services are provided by',

    // Usage
    usageHeading:           'Using our digital services',
    usageFallback:          'We aim to make our digital services inclusive and accessible for people of all abilities.\nMany users may benefit from adjusting their device, operating system, or browser accessibility settings or using assistive technologies—for example, screen readers, display and text size adjustments, or color and contrast settings.\nFor guidance, please refer to your device, operating system, or browser accessibility help resources, which explain how to configure these features. If you need help adapting our services to your needs, please <a href="#feedback-heading">contact us for assistance</a>.',

    // Limitations
    limitationsHeading:     'Limitations of these digital services\' accessibility',
    knownLimitations:       'Known Limitations',
    plannedFix:             'Planned Fix Timeline',
    acrLinkCompliant:       'For details on the evaluation scope and testing methods used, see the <a href="acr">Accessibility Conformance Report</a>.',
    acrLinkNonCompliant:    'We are actively working to address these issues. For a complete list of known issues and their status, see the <a href="acr">Accessibility Conformance Report</a>.',

    // Feedback
    feedbackHeading:        'Feedback and Contact',
    feedbackIntro:          'If you encounter any accessibility issues or difficulties, please let us know via:',
    feedbackNote:           'To help us address your issue, please include the details recommended in <a href="https://www.w3.org/WAI/users/inaccessible" target="_blank" rel="noopener">"Contacting Organizations about Inaccessible Websites" (external site)</a>. We welcome all constructive feedback and will carefully review accessibility and usability issues.',

    // Technical / compliance
    technicalHeading:       'Technical information on accessibility',
    technicalCommitment:    'is committed to making its digital products accessible, in accordance with',
    complianceStatus:       'Compliance Status',
    complianceSubheading:   'Compliance status',
    complianceNote:         'Compliance status is based on the results of an accessibility conformance evaluation. Detailed information about the evaluation, including its scope, methods, and findings, is available in the <a href="acr">Accessibility Conformance Report</a>.',

    // Preparation
    preparationHeading:     'Preparation of this statement',
    preparedOn:             'This accessibility statement was prepared on',
    lastReviewedOn:         'and last reviewed on',
    testingPeriod:          'Testing Period',
    testedIn:               'The digital service was tested in',
    testedAgainst:          'against',
    testedSample:           'The evaluation included a representative sample of user flows and content.',

    // Dates / metadata
    statementDate:          'Statement Date',
    lastReviewed:           'Last Reviewed',
    feedbackTime:           'Feedback Response Time',

    // Issuance
    issuanceHeading:        'Official issuance and approval',
    issuedBy:               'Issued by',

    // Certification
    certHeading:            'Accessibility certification',
    certBody:               'The digital service is listed in the Accessibility Registry by Axall.',
    certIdLabel:            'Certificate ID',
    certRegistryLink:       'Visit the Accessibility Registry for more information.',
    registryUrl:            'Accessibility Registry',

    // Footer
    viewFullAcr:            'View the full Accessibility Conformance Report →',
    enforcementHeading:     'Enforcement',

  },

  lt: {

    // ── SHARED ───────────────────────────────────────────────────────────────
    pageTitle:              'Prieinamumo atitikties ataskaita',
    statementTitle:         'Atitikties paraiška dėl prieinamumo',
    htmlLang:               'lt',

    supports:               'Palaiko',
    partiallySup:           'Iš dalies palaiko',
    doesNotSup:             'Nepalaiko',
    notApplicable:          'Netaikoma',
    notEvaluated:           'Nevertinta',

    contactInfo:            'Kontaktinė informacija',
    productDescription:     'Produkto aprašymas',
    evaluators:             'Vertintojai',
    leadEvaluator:          'Pagrindinis vertintojas',
    disabilityReviewer:     'Ekspertas su negalia',
    organisation:           'Organizacija',
    disability:             'Negalia',
    version:                'Versija',
    learnMore:              'Sužinoti daugiau',

    // ── ACR ──────────────────────────────────────────────────────────────────
    reportSubtitle:         'EN 301 549 leidimas',
    vpatEditionNote:        'Parengta pagal VPAT® 2.5 Rev',
    preparedBy:             'Parengė',

    nameOfProduct:          'Produkto pavadinimas / versija',
    reportDate:             'Ataskaitos data',
    notesLabel:             'Pastabos',
    scopeSection:           'Vertinimo imtis',
    evaluationSection:      'Vertinimas',
    evalMethodsUsed:        'Taikyti vertinimo metodai',
    assistiveTech:          'Testavimas pagalbinėmis technologijomis',
    automatedTools:         'Testavimas naudojant automatinius įrankius',
    methodology:            'Vertinimo metodologija',
    tools:                  'Priemonės, metodai ir kita informacija',
    coverage:               'Vertinimo apimtis',
    applicableStandards:    'Taikomi standartai ir gairės',
    standardsIntro:         'Ši ataskaita apima šių prieinamumo standartų ir (arba) gairių atitikties laipsnį:',
    termsSection:           'Sąvokos',
    termsIntro:             'Skiltyje „Atitikties lygis" vartojamos sąvokos apibrėžiamos taip:',
    legalDisclaimer:        'Atsakomybės ribojimas',
    legalDisclaimerDefault: '© {year} {company}. Ši ataskaita atspindi {product} prieinamumo būklę aukščiau nurodytos vertinimo datos duomenimis ir parengta vadovaujantis ITI {vpat} Edition kriterijais. {company} negali garantuoti, kad šioje ataskaitoje pateikta informacija išliks tiksli po jos paskelbimo datos. Bet kokie {product} pakeitimai, atnaujinimai ar pritaikymai gali turėti įtakos šios ataskaitos tikslumui ar taikomumui. Ši ataskaita pateikiama tik informaciniais tikslais.\n\n„Axall" UAB patvirtina, kad šioje ataskaitoje pateikti vertinimo rezultatai tiksliai atspindi {product} būklę, nustatytą šioje ataskaitoje apibrėžtos apimties ribose ir vertinimo datą. Jei {product} bus pakeistas po vertinimo datos arba jei šią ataskaitą pakeis bet kuri kita šalis, o ne „Axall" UAB, „Axall" UAB negalės būti laikoma atsakinga už pateiktų rezultatų tikslumą. Rekomenduojama peržiūrėti šią ataskaitą po bet kokių reikšmingų produkto pakeitimų, bet ne rečiau kaip kartą per metus.',

    thCriteria:             'Kriterijai',
    thConformance:          'Atitikties lygis',
    thRemarks:              'Pastabos ir paaiškinimai',
    thStandard:             'Standartas / gairės',
    thIncluded:             'Įtraukta į ataskaitą',
    thLevel:                'Lygis',
    yesLabel:               'Taip',
    noLabel:                'Ne',

    termSupports:           'Palaiko',
    termSupportsDesc:       'Produkto funkcionalumas turi bent vieną metodą, kuris atitinka kriterijų be žinomų trūkumų arba atitinka su lygiaverčiu palengvinimu.',
    termPartiallySup:       'Iš dalies palaiko',
    termPartiallySupDesc:   'Kai kurios produkto funkcijos neatitinka kriterijaus.',
    termDoesNotSup:         'Nepalaiko',
    termDoesNotSupDesc:     'Dauguma produkto funkcijų neatitinka kriterijaus.',
    termNotApplicable:      'Netaikoma',
    termNotApplicableDesc:  'Kriterijus produktui nėra taikomas.',
    termNotEvaluated:       'Nevertinta',
    termNotEvaluatedDesc:   'Produktas nebuvo įvertintas pagal šį kriterijų. Šią reikšmę galima naudoti tik WCAG AAA lygio kriterijams.',

    noteWcagSupports:       'WCAG lentelėse atitikties lygis žymimas kaip „Palaiko" net ir tada, kai produkte nėra turinio, kuriam būtų taikomas sėkmės kriterijus. Tai atitinka <a href="https://www.w3.org/TR/WCAG20/#conformance-reqs" target="_blank" rel="noopener">WCAG 2.0 atitikties sampratos reikalavimus</a>.',
    noteWcagVerified:       'Kriterijai, pažymėti kaip „Palaiko", nurodo, kad produktas palaiko atitinkamą kriterijų, remiantis <a href="#evaluation">aukščiau aprašytais vertinimo imtimi ir metodais</a>.',
    noteEnNotApplicable:    'EN 301 549 lentelėse „Netaikoma" žymima tais atvejais, kai konkreti funkcija, kuriai taikomas kriterijus, nėra produkto dalis. Pavyzdžiui, jei produktas yra Saitynas (Web), EN 301 549 skyrius 8. Techninė įranga bus pažymėtas „Netaikoma". Tai atitinka <a href="https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf" target="_blank" rel="noopener">EN 301 549 atitikties sampratos reikalavimus</a>.',

    wcagReport:             'WCAG 2.x ataskaita',
    wcagReportIntro:        '1 ir 2 lentelėse dokumentuojama atitiktis šiems EN 301 549 skyriams:',
    wcagReportClauses:      '<li>9 skyrius — Saitynas (Web)</li><li>10 skyriaus 10.1–10.4 punktai — Elektroniniai dokumentai (Non-Web Documents)</li><li>11 skyriaus 11.1–11.4 ir 11.8.2 punktai — Programinė įranga (Software)</li><li>12 skyriaus 12.1.2 ir 12.2.4 punktai — Dokumentacija ir pagalbos paslaugos (Documentation and Support Services)</li>',
    wcagReportNote:         'Pastaba: teikiant ataskaitas apie atitiktį WCAG 2.x sėkmės kriterijams (Success Criteria), atsižvelgiama į visus puslapius, išbaigtus procesus ir prieinamumą palaikančius technologijų naudojimo būdus, kaip nurodyta <a href="https://www.w3.org/TR/WCAG20/#conformance-reqs" target="_blank" rel="noopener">WCAG 2.0 atitikties reikalavimuose</a>.',
    tableLevelA:            '1 lentelė: Sėkmės kriterijai, A lygis',
    tableLevelAA:           '2 lentelė: Sėkmės kriterijai, AA lygis',

    enReport:               'EN 301 549 ataskaita',
    enClauseLabel:          'Skyrius',

    evalIntroWithScope:     'Ši atitikties ataskaita parengta remiantis prieinamumo vertinimo, kurį atliko {specialist}, rezultatais. Vertinimas apėmė {count} {word} imtį. Šie {word} buvo atrinkti „AxAll" UAB kaip reprezentatyvūs, atspindintys bendrą {title} prieinamumą ir funkcionalumą. {word} sąrašas pateiktas skyriuje „{section}".',
    evalIntroNoScope:       'Ši atitikties ataskaita parengta remiantis prieinamumo vertinimo, kurį atliko {specialist}, rezultatais.',

    backToStatement:        'Grįžti į pareiškimą dėl prieinamumo',
    viewFullReport:         'Peržiūrėti visą atitikties ataskaitą',

    // ── STATEMENT ─────────────────────────────────────────────────────────────
    introAppliesTo:         'Ši atitikties paraiška dėl prieinamumo (toliau – Atitikties paraiška) taikoma šioms skaitmeninėms paslaugoms:',
    introWebsite:           'Interneto svetainė',
    introApp:               'Mobilioji programėlė',
    introDocs:              'E. dokumentai: publikuojami elektroniniai dokumentai',
    introReferredAs:        'toliau',
    introCollective:        'skaitmeninės paslaugos',
    introProvidedBy:        'Paslaugas teikia',

    usageHeading:           'Naudojimasis mūsų skaitmeninėmis paslaugomis',
    usageFallback:          'Mes siekiame, kad mūsų skaitmeninės paslaugos būtų įtraukios ir prieinamos visiems žmonėms. Jei naudojate pagalbines technologijas ar specialius prieinamumo nustatymus, mūsų paslaugos sukurtos taip, kad veiktų su standartinėmis įrenginio, naršyklės ir operacinės sistemos prieinamumo funkcijomis. Jei susiduriate su sunkumais, <a href="#feedback-heading">susisiekite su mumis</a>.',

    limitationsHeading:     'Šių skaitmeninių paslaugų prieinamumo apribojimai',
    knownLimitations:       'Žinomi apribojimai',
    plannedFix:             'Planuojamo taisymo grafikas',
    acrLinkCompliant:       'Išsamią informaciją apie vertinimo apimtį ir naudotus testavimo metodus rasite <a href="acr">Prieinamumo atitikties ataskaitoje</a>.',
    acrLinkNonCompliant:    'Aktyviai dirbame, kad ištaisytume šias problemas. Išsamų žinomų problemų ir jų būsenos sąrašą rasite <a href="acr">Prieinamumo atitikties ataskaitoje</a>.',

    feedbackHeading:        'Grįžtamasis ryšys ir kontaktai',
    feedbackIntro:          'Jei susidūrėte su prieinamumo kliūtimis, praneškite mums šiais būdais:',
    feedbackNote:           'Kad galėtume greitai išspręsti jūsų problemą, prašome kartu su užklausa pateikti informaciją, rekomenduojamą skiltyje <a href="https://www.w3.org/WAI/users/inaccessible" target="_blank" rel="noopener">„Susisiekimas su organizacijomis dėl neprieinamų svetainių" (išorinė nuoroda, tekstas anglų kalba)</a>. Vertiname ir kruopščiai peržiūrime visus konstruktyvius atsiliepimus apie prieinamumą bei tinkamumą naudoti.',

    technicalHeading:       'Techninė informacija apie prieinamumą',
    technicalCommitment:    'yra įsipareigojusi užtikrinti savo skaitmeninių produktų prieinamumą remiantis',
    complianceStatus:       'Atitikties lygis',
    complianceSubheading:   'Atitikties lygis',
    complianceNote:         'Atitikties lygis grindžiamas skaitmeninio prieinamumo atitikties vertinimo rezultatais. Išsamią informaciją apie vertinimą, įskaitant jo išvadas, apimtį ir metodus, rasite <a href="acr">Prieinamumo atitikties ataskaitoje</a>.',

    preparationHeading:     'Atitikties paraiškos rengimas',
    preparedOn:             'Ši atitikties paraiška buvo parengta',
    lastReviewedOn:         'o paskutinį kartą peržiūrėta',
    testingPeriod:          'Testavimo laikotarpis',
    testedIn:               'Skaitmeninė paslauga buvo testuota',
    testedAgainst:          'pagal',
    testedSample:           'Vertinimo metu buvo nagrinėjama reprezentatyvi naudotojų srautų ir turinio imtis.',

    statementDate:          'Pareiškimo data',
    lastReviewed:           'Paskutinė peržiūra',
    feedbackTime:           'Grįžtamojo ryšio atsakymo laikas',

    issuanceHeading:        'Oficialus išleidimas ir patvirtinimas',
    issuedBy:               'Išdavė',

    certHeading:            'Prieinamumo registracija',
    certBody:               'Skaitmeninė paslauga yra įtraukta į AxAll prieinamumo registrą.',
    certIdLabel:            'Pažymėjimo ID',
    certRegistryLink:       'Daugiau informacijos rasite prieinamumo registro puslapyje.',
    registryUrl:            'Prieinamumo registras',

    viewFullAcr:            'Peržiūrėti visą prieinamumo atitikties ataskaitą →',
    enforcementHeading:     'Vykdymo užtikrinimas',

  },
};

// -----------------------------------------------------------------------------
// 8. Initialise — call once after API response arrives
// Sets <html lang=""> and returns the correct string set
// -----------------------------------------------------------------------------
function initLang(lang) {
  const safeLang = (lang === 'lt') ? 'lt' : 'en';
  document.documentElement.lang = safeLang;
  return UI[safeLang];
}

// -----------------------------------------------------------------------------
// Usage reference (do not delete — documents API for template authors)
//
// After fetching /api/audit/:slug:
//   const data = await resp.json();
//   const lang = data.lang || 'en';
//   const t = initLang(lang);
//
// UI labels:       t.pageTitle  /  t.thCriteria  etc.
// Data fields:     langField(data.auditTitle, data.auditTitleLT, lang)
// Clause headers:  clauseLabel(row.enClause, lang)
// Conformance:     conformanceLabel(row.conformance, t)
// Compliance:      complianceLabel(data.complianceStatus, lang)
// Directive:       directiveLabel(data.applicableDirective, lang)
// WCAG labels:     langField(data.settings.wcag21LabelEN, data.settings.wcag21LabelLT, lang)
// EN ref terms:    translateEnRef(text, lang) / enRefLabel(lang)
// -----------------------------------------------------------------------------
