"use strict";

import LoadScene from "./scenes/LoadScene.js";
import GameScene from "./scenes/GameScene.js";

export default class Bowler {
	constructor() {
		this.scene.add(LoadScene);
		this.scene.add(GameScene);
		this.scene.start("Load");
	}
}
