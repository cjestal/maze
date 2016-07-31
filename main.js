var ship;
var mainState = {
	preload: function() {
		game.load.image('ship','assets/bird.png');
		game.load.image('rock','assets/pipe.png');
		game.load.image('space','assets/space.jpg');
	    var pixelWidth = 6;
    	var pixelHeight = 6;

	    var ufo = [
	      '....DDDDDDDD....',
	      '...DDEEDDDDDD...',
	      '..DDDEEDDDDDDD..',
	      '..DDDDDDDDDDDD..',
	      '..DDDD5555DDDD..',
	      '..DDD555555DDD..',
	      '..DDD555555DDD..',
	      '..DDD555555DDD..',
	      '..334244333333..',
	      '.33344443333333.',
	      '3333444433333333',
	      '....5...5..5....',
	      '...5....5...5...',
	      '.66....66....66.',
	      '.66....66....66.'
	    ];

	    var alien = [
	      '....44........',
	      '....44........',
	      '......5.......',
	      '......5.......',
	      '....ABBBBA....',
	      '...ABBBBBBA...',
	      '..ABB8228BBA..',
	      '..BB882288BB..',
	      '.ABB885588BBA.',
	      'BBBB885588BBBB',
	      'BBBB788887BBBB',
	      '.ABBB7777BBBA.',
	      '.ABBBBBBBBBBA.',
	      '.AABBBBBBBBAA.',
	      '.AAAAAAAAAAAA.',
	      '.5AAAAAAAAAA5.'
	    ];
    
    	game.create.texture('alien', alien, pixelWidth, pixelHeight);
	    game.create.texture('ufo', ufo, pixelWidth, pixelHeight);
	},
	create: function() {
		game.stage.backgroundColor = '#71c5cf';
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.world.enableBody = true;
		game.add.sprite(0, 0, 'space');
		
		ship = game.add.sprite(game.world.randomX,490,'ufo');
		ship.width = 20;
		ship.height = 20;
		game.physics.arcade.enable(ship);

		this.rocks = game.add.group();
		
		for (var y = 0; y < 7; y++) {
			var hole = Math.floor(Math.random() * 13) + 1;
			for (var x = 0; x < 15; x++) {
				if (x != hole && x != hole + 1) {
					var rock = game.add.sprite(x * 25 + 10, y * 70 + 10,'alien');
					this.rocks.add(rock);
					rock.body.immovable = true;
					rock.width = 20;
					rock.height = 20;
				}
			}
		}

		game.input.onDown.add(this.moveShip,200);
	},
	moveShip: function () {
		game.camera.follow();
		game.physics.arcade.moveToPointer(ship, 170);
	},
	restartGame: function () {
		game.state.start('main');
	},
	update: function () {
		if (ship.y < 0 || ship.y > 520 || ship.x < 0 || ship.x > 390) {
			this.restartGame();
		}
		// game.physics.arcade.collide(ship, this.rocks);
		game.physics.arcade.overlap(ship, this.rocks, this.restartGame, null, this);
	},
	addOneRock: function (x,y) {
		
	},
	addRowOfRocks: function () {
		for (var i = 0; i < 20; i++) {
			var rock = game.add.sprite(i * 15, 10,'rock');
			this.rocks.add(rock);
			rock.body.immovable = true;
			rock.width = 20;
			rock.height = 20;
		}
	}
};

var game = new Phaser.Game(390,520);

game.state.add('main',mainState);
game.state.start('main');