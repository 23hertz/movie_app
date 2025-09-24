// lib/fontawesome.ts

import { config, library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import "@fortawesome/fontawesome-svg-core/styles.css";

// Prevent automatic CSS insertion so we control when/how it's loaded
config.autoAddCss = false;

// Optionally, add entire icon sets (fas, fab) or individual icons
library.add(fas);
