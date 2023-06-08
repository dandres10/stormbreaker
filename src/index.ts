#!/usr/bin/env node

import { Injection } from "./4cross";

const DIR_ACTUAL_CLIENT = process.cwd();
const _architectureFacade = Injection.InjectionArchitectureFacade();


_architectureFacade.Start(DIR_ACTUAL_CLIENT);








