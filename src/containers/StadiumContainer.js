import config from "../config/config";

 class StadiumContainer extends Phaser.GameObjects.Container{

    constructor(scene){
        super(scene,0,0)
        this.scene.add.existing(this);
        this.addStadiumElements();
        this.createWicketStump();
	}
	
/*********************************************************************************
 *  create and position the stadium elements
 */
    addStadiumElements(){
        this.middleStadium = this.scene.add.image(config.width * 0.5, config.height * 0.5, "midStadium");
        this.middleStadium.setScale(0.8,1)
        this.rightStadium = this.scene.add.image(this.middleStadium.x +  610,  config.height * 0.5, "rightStadium").setOrigin(0,0.5);
        this.rightStadium.setScale(0.8,1);
        this.leftStadium = this.scene.add.image(-330,  config.height * 0.5, "leftStadium").setOrigin(0,0.5);
        this.leftStadium.setScale(0.8,1);
    }

/*********************************************************************************
 *  generated and play wicket animation
 */
    playWicketAnimation() {
        this.scene.anims.create({
			key: 'wicketAnim',
			frames :[
				{
				key : 'wicketStump',
				frame: "Wicket Animation-0.png"
			   }, {
				key : 'wicketStump',
				frame: "Wicket Animation-1.png"
			   }, {
				key : 'wicketStump',
				frame: "Wicket Animation-2.png"
			   }, {
				key : 'wicketStump',
				frame: "Wicket Animation-3.png"
			   }, {
				key : 'wicketStump',
				frame: "Wicket Animation-4.png"
			   }, {
				key : 'wicketStump',
				frame: "Wicket Animation-5.png"
			   }, 	{
				key : 'wicketStump',
				frame: "Wicket Animation-6.png"
			   }, {
				key : 'wicketStump',
				frame: "Wicket Animation-7.png"
			   }, {
				key : 'wicketStump',
				frame: "Wicket Animation-8.png"
			   }, {
				key : 'wicketStump',
				frame: "Wicket Animation-9.png"
			   }, {
				key : 'wicketStump',
				frame: "Wicket Animation-10.png"
			   }, {
				key : 'wicketStump',
				frame: "Wicket Animation-11.png"
			   }
			]
        });
        this.wicketStump.setAlpha(1);
        this.wicketStump.play("wicketAnim");
	}


/*********************************************************************************
 *  hides the wicket stump during the beginning of the game play
 */
    hideObj() {
        this.wicketStump.setAlpha(0);
    }

/*********************************************************************************
 *  destroys the game stump at the end of the over - After 3 ball completion
 */
    destroyObj() {
        this.wicketStump.destroy();
    }


/*********************************************************************************
 *  destroys the game stump at the end of the over - After 3 ball completion
 */
    getSafeAreaWidth() {
        return this.middleStadium.width;
    }



/*********************************************************************************
 *  destroys the game stump at the end of the over - After 3 ball completion
 */
    createWicketStump() {
        this.wicketStump = this.scene.add.sprite(config.width * 0.5, config.height * 0.57,"wicketStump").setAlpha(0);
    }



/*********************************************************************************
 *  destroys the game stump at the end of the over - After 3 ball completion
 */
    getSafeAreaHeight() {
        return this.middleStadium.height;
    }

}

export default StadiumContainer;
