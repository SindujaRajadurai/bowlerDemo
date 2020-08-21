import config from "../config/config";
import StadiumContainer from "../containers/StadiumContainer";

class GameScene extends Phaser.Scene {
	constructor() {
		super("Game");
		this.startBowlerAnimation = false;
		this.startBallAnimation = false;
		this.startBowlPos;
		this.totalTime = 900;
		this.bowlingStarted = false;
		this.configurePositions();
		this.overCompleted = 3;
		this.noOfBalls = 0;
	}
	init() {}
	preload() {
		this.generateAnimations();
		this.scale.startFullscreen();
	}
	configurePositions() {
		this.pitchPoint = 1200;
		this.wicketPos = 1300;
		this.groundBoundary = 1900;
	}
/*********************************************************************************
 *  generate bowler's Animation
 */
	generateAnimations() {
		var frameNames = this.textures.get('bowlerSprite').getFrameNames();
		this.anims.create({
			key: 'bowlerAnim',
			frames :[
				{
				key : 'bowlerSprite',
				frame: "BOWLER 1.png"
			   }, {
				key : 'bowlerSprite',
				frame: "BOWLER 2.png"
			   }, {
				key : 'bowlerSprite',
				frame: "BOWLER 3.png"
			   }, {
				key : 'bowlerSprite',
				frame: "BOWLER 4.png"
			   }, {
				key : 'bowlerSprite',
				frame: "BOWLER 5.png"
			   }, {
				key : 'bowlerSprite',
				frame: "BOWLER 6.png"
			   }, 	{
				key : 'bowlerSprite',
				frame: "BOWLER 7.png"
			   }, {
				key : 'bowlerSprite',
				frame: "BOWLER 8.png"
			   }, {
				key : 'bowlerSprite',
				frame: "BOWLER 9.png"
			   }, {
				key : 'bowlerSprite',
				frame: "BOWLER 10.png"
			   }, {
				key : 'bowlerSprite',
				frame: "BOWLER 11.png"
			   }, {
				key : 'bowlerSprite',
				frame: "BOWLER 12.png"
			   }
			]
		});
	}

	create() {
	   this.stadiumGroup = new StadiumContainer(this);
	   this.addBowlButton();
	   this.addBowlerAnimation();
	   this.ball = this.add.image(config.width * 0.5, config.height * 0.12, "ball")
						   .setAlpha(0).setScale(0.2);
	}
/*********************************************************************************
 *  Adds the button positions it
 *  Set its interactive property 
 *  Adds callback
 */
	addBowlButton() {
		this.play = this.add.image(config.width * 0.5, config.height * 0.12, "play")
					.setScale(0.5,0.5)
					.setInteractive();
		var _self = this;
		this.play.on('pointerdown',function(pointer){
			_self.play.setInteractive(false);
			_self.setInitialBowlerPosition();
			_self.playBowlerAnimation();
		});
	}

/*********************************************************************************
 *  Adds the bowler and positions it
 *  create the animation
 */
	addBowlerAnimation(){
		this.bowler= this.add.sprite(config.width * 0.55, config.height * 0.39,'bowlerSprite').setScale(0.4);
		this.bowlerAnimation = this.anims.create({
			key: "BowlerAnim",
			frames: this.anims.generateFrameNumbers("bowlerSprite"),
			frameRate: 15,
		});
	}

/*********************************************************************************
 *  sets the initial bowler position
 */
	setInitialBowlerPosition() {
		this.startBowlPosX = config.width * 0.55;
		this.startBowlPosY = config.height * 0.35;
	}

	update() {
		if(this.startBallAnimation){
			this.playBallAnimation();
		}
	}

/*********************************************************************************
 *  play bowler animation
 *  adds animation complete call back
 */
	playBowlerAnimation() {
		this.bowler.play("bowlerAnim");
		this.bowler.on("animationcomplete", this.triggerBallAnimation, this);
	}


/*********************************************************************************
 *  start ball animation
 */
	triggerBallAnimation() {
		if(!this.bowlingStarted) {
		this.ball.setPosition(this.startBowlPosX,this.startBowlPosY);
		this.presentBallTime = new Date().getTime();
		this.startBallAnimation = true;
		this.bowlingStarted = true;
		}
	}



/*********************************************************************************
 *  triggers ball path animation 
 *  resets the bolwer position and makes it ready for the next ball
 */
	playBallAnimation() {
		this.ballTimeDiff = new Date().getTime() - this.presentBallTime;
		if(this.ball.y < this.groundBoundary)
			this.ballPathMovement();
		else 
			this.resetBowlingpositions();
	}


/*********************************************************************************
 *  plays ball path animation 
 */
	ballPathMovement() {
		this.ball.setAlpha(1);
		if(this.ball.y > this.pitchPoint) {
			this.ball.setScale(this.ball.scale + 0.01);
			this.ball.y += 8;
			this.ball.x -=6;
			this.ball.setPosition(this.ball.x,this.ball.y);
		} else {
			this.ball.y += 10;
			this.ball.x -=1;
			this.ball.setPosition(this.ball.x,this.ball.y);
		}
		if(this.ball.y > this.wicketPos) {
			this.stadiumGroup.playWicketAnimation();
		}
	}



/*********************************************************************************
 *  resets the ball position 
 *  over completion condition
 */
	resetBowlingpositions(){
		this.bowler.setPosition(config.width * 0.55, config.height * 0.39);
		this.ball.setAlpha(0);
		this.ball.setScale(0.2);
		this.bowlingStarted = false;
		this.ball.setPosition(this.startBowlPosX,this.startBowlPosY)
		this.stadiumGroup.hideObj();
		this.noOfBalls++;
		this.startBallAnimation = false;
		if(this.noOfBalls < this.overCompleted ) {
		var timer = this.time.addEvent({
			delay: 10000,                
			callback: this.playBowlerAnimation(),
			callbackScope: this,
		});
		} else {
			this.ball.destroy();
			this.stadiumGroup.destroyObj();
		}
	}
}

export default GameScene;


