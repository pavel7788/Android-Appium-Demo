#!/usr/bin/env node
// Removes nested asyncbox@6.3.5 copies that cause ERR_REQUIRE_CYCLE_MODULE
// on Node.js 20.19.0+. Forces all driver packages to share the single
// asyncbox@6.4.2 at appium-uiautomator2-driver/node_modules/asyncbox.
'use strict';
const fs = require('fs');
const path = require('path');

const base = path.join(__dirname, 'node_modules', 'appium-uiautomator2-driver', 'node_modules');
const targets = [
  path.join(base, '@appium', 'base-driver', 'node_modules', 'asyncbox'),
  path.join(base, '@appium', 'support', 'node_modules', 'asyncbox'),
];

for (const target of targets) {
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
    console.log(`postinstall: removed ${path.relative(__dirname, target)}`);
  }
}
