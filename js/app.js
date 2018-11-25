/**
 * @class Utils
 */
class Utils {
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

/**
 * @class Enemy
 */
class Enemy extends Utils{

    constructor() {
        super();
        this.init = -90;
        this.x = this.init;
        this.y = this.enemyPositionY();
        this.sprite = 'images/enemy-bug.png';
    }

    /**
     * Responsavel na velocidade de movimentação do inimigo 
     */
    enemySpped() {
        return Math.random() * 399 + 38;    
    }

    /**
     * @description Responsavel em configurar ponto inicial em que se encontra o inimigo
     */
    enemyPositionY() {
        const positionY = [40, undefined, 125, undefined , 210];
        return positionY[Math.floor(Math.random() * 5)];
    }

    /**
     * @description Responsavel em 
     * 1) Atualiza a localização do inimigo.
     * 2) Tratar do choque com o jogador
     * @param {number} dt 
     */
    update(dt) {
        this.x += this.enemySpped() * dt;

        if(this.x > 505) {
            this.y = this.enemyPositionY();
            this.x = this.init;
            this.enemySpped();
        }

        /**
         * @description Responsavel em Tratar do choque com o jogador
         */
        if (player.y + 55 < (this.y === undefined ? 1 : this.y) + 135 &&
            player.x + 80 > this.x + 30 &&
            player.y + 100 > (this.y === undefined ? 1 : this.y) + 75 &&
            player.x + 20 < this.x + 70) {    
                player.defaultPosition();
        }
    }
}

/**
 * @class Player
 */
class Player extends Utils {
    constructor() {
        super();
        this.defaultX = 201;
        this.defaultY = 402;
        
        this.x = this.defaultX;
        this.y = this.defaultY;
        this.sprite = 'images/char-boy.png';
    }

    /**
     * @description Atualiza o ponto inicial em que se encontra o jogador.
     */
    defaultPosition() {
        this.x = this.defaultX;
        this.y = this.defaultY;
    }

    update() {
        /**
         * @description Atualiza o jogador para posição default quando o Jogador chega na agua
         */
        if(this.y === -48) 
            setTimeout(() => { this.defaultPosition(); }, 200);
    }

    handleInput(direction) {
        /**
         * @description Responsavel em fazer o tratamendo das direções do Player
         */
        if(direction) {
            switch(direction) {
                // left = FLECHA DO TECLADO ESQUERDA
                case 'left':
                    if(this.x == 21){
                        this.x=21;
                    } else {
                        this.x-=90;
                    } 
                    break;
                // right = FLECHA DO TACLADO DIREITA
                case 'right':
                    if(this.x == 381) 
                        this.x = 381;
                    else
                        this.x+=90;
                    break;
                // up = FLECHA DO TECLADO PARA CIMA
                case 'up':
                    if(this.y == -48)
                        this.y = -48;
                    else
                        this.y-=90;
                    break;
                // down = FLECHA DO TECLADO PARA BAIXO
                case 'down':
                    if(this.y == 402)
                        this.y = 402;
                    else
                        this.y+=90;
                    break;
                default:
                    break;
            }
        }
    }

}

const allEnemies = [];

// Tamanho da lista que desejo colocar na lista
const lengthEnemies = 6;
/**
 * @description Responsavel em montar uma lista de allEnemies
 */
for(let i = 0; i < lengthEnemies; i++)
    allEnemies.push(new Enemy());

// Instanciando o Player
var player = new Player();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
