import { application } from "./application"

import HelloController from "./hello_controller"
application.register("hello", HelloController)

import MonteController from "./monte_controller"
application.register("monte", MonteController)
