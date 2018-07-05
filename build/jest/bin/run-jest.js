#!/usr/bin/env node

const jest = require('jest-cli');
const path = require('path');
const createJestConfig = require('../src/createJestConfig');

jest.runCLI(createJestConfig(process.cwd()), [path.join(__dirname, '..', '..', '..')]);
