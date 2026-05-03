// Battle moves data
export const moves = {
  tackle: { name: "Tackle", type: "normal", power: 40, accuracy: 100 },
  scratch: { name: "Scratch", type: "normal", power: 40, accuracy: 100 },
  ember: { name: "Ember", type: "fire", power: 40, accuracy: 100 },
  waterGun: { name: "Water Gun", type: "water", power: 40, accuracy: 100 },
  vineWhip: { name: "Vine Whip", type: "grass", power: 40, accuracy: 100 },
  thunderShock: { name: "Thunder Shock", type: "electric", power: 40, accuracy: 100 },
  quickAttack: { name: "Quick Attack", type: "normal", power: 40, accuracy: 100 },
  bite: { name: "Bite", type: "dark", power: 40, accuracy: 100 }
};

// Type effectiveness
const typeEffectiveness = {
  fire: { grass: 2, ice: 2, bug: 2, water: 0.5, rock: 0.5, dragon: 0.5 },
  water: { fire: 2, ground: 2, rock: 2, grass: 0.5, electric: 0.5 },
  grass: { water: 2, ground: 2, rock: 2, fire: 0.5, ice: 0.5, poison: 0.5, flying: 0.5 },
  electric: { water: 2, flying: 2, grass: 0.5, electric: 0.5, ground: 0 },
  normal: { rock: 0.5, steel: 0.5, ghost: 0 },
  dark: { psychic: 2, ghost: 2, fighting: 0.5, dark: 0.5, fairy: 0.5 }
};

class BattleService {
  constructor(playerPokemon, opponentPokemon) {
    this.player = {
      ...playerPokemon,
      currentHp: playerPokemon.stats.hp,
      maxHp: playerPokemon.stats.hp,
      name: playerPokemon.name,
      types: playerPokemon.types,
      stats: playerPokemon.stats
    };
    this.opponent = {
      ...opponentPokemon,
      currentHp: opponentPokemon.stats.hp,
      maxHp: opponentPokemon.stats.hp,
      name: opponentPokemon.name,
      types: opponentPokemon.types,
      stats: opponentPokemon.stats
    };
    this.battleLog = [];
    this.battleEnded = false;
    this.winner = null;
    this.turn = 'player'; // player starts
  }

  calculateDamage(attacker, defender, move) {
    // Get type effectiveness
    const attackType = move.type;
    const defenderType = defender.types[0];
    let effectiveness = typeEffectiveness[attackType]?.[defenderType] || 1;
    
    // Check second type
    if (defender.types.length > 1) {
      const secondType = defender.types[1];
      const secondEffect = typeEffectiveness[attackType]?.[secondType] || 1;
      effectiveness *= secondEffect;
    }
    
    // Damage formula
    let attackStat = attacker.stats.attack;
    let defenseStat = defender.stats.defense;
    
    let damage = Math.floor((((2 * 50 / 5 + 2) * move.power * attackStat / defenseStat) / 50) + 2);
    damage *= effectiveness;
    damage *= (0.85 + Math.random() * 0.3); // Random factor
    
    // Critical hit (6.25% chance)
    const isCritical = Math.random() < 0.0625;
    if (isCritical) {
      damage *= 1.5;
      this.addLog(`💥 Critical hit!`, 'critical');
    }
    
    // Type effectiveness message
    if (effectiveness > 1) {
      this.addLog(`🎯 Super effective!`, 'advantage');
    } else if (effectiveness < 1) {
      this.addLog(`⚠️ Not very effective...`, 'disadvantage');
    }
    
    return Math.max(1, Math.floor(damage));
  }

  playerAttack(moveName) {
    if (this.battleEnded || this.turn !== 'player') return null;
    
    const move = moves[moveName];
    if (!move) return null;
    
    // Check accuracy
    if (Math.random() * 100 > move.accuracy) {
      this.addLog(`${this.player.name}'s attack missed!`, 'miss');
      this.turn = 'opponent';
      setTimeout(() => this.opponentTurn(), 1000);
      return { hit: false, damage: 0 };
    }
    
    this.addLog(`${this.player.name} used ${move.name}!`, 'action');
    
    const damage = this.calculateDamage(this.player, this.opponent, move);
    this.opponent.currentHp = Math.max(0, this.opponent.currentHp - damage);
    this.addLog(`It dealt ${damage} damage!`, 'damage');
    
    // Check if opponent fainted
    if (this.opponent.currentHp <= 0) {
      this.battleEnded = true;
      this.winner = 'player';
      this.addLog(`${this.opponent.name} fainted!`, 'faint');
      this.addLog(`🏆 ${this.player.name} wins! 🏆`, 'win');
      return { hit: true, damage, battleEnded: true };
    }
    
    this.turn = 'opponent';
    setTimeout(() => this.opponentTurn(), 1000);
    return { hit: true, damage };
  }

  opponentTurn() {
    if (this.battleEnded || this.turn !== 'opponent') return;
    
    // AI: Choose a random move
    const availableMoves = ['tackle', 'quickAttack', 'bite'];
    const moveName = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    const move = moves[moveName];
    
    this.addLog(`${this.opponent.name} used ${move.name}!`, 'action');
    
    // Check accuracy
    if (Math.random() * 100 > move.accuracy) {
      this.addLog(`${this.opponent.name}'s attack missed!`, 'miss');
      this.turn = 'player';
      return;
    }
    
    const damage = this.calculateDamage(this.opponent, this.player, move);
    this.player.currentHp = Math.max(0, this.player.currentHp - damage);
    this.addLog(`It dealt ${damage} damage!`, 'damage');
    
    // Check if player fainted
    if (this.player.currentHp <= 0) {
      this.battleEnded = true;
      this.winner = 'opponent';
      this.addLog(`${this.player.name} fainted!`, 'faint');
      this.addLog(`💔 ${this.opponent.name} wins! 💔`, 'lose');
    }
    
    this.turn = 'player';
  }

  addLog(message, type = 'info') {
    this.battleLog.push({
      text: message,
      type: type,
      timestamp: new Date().toISOString()
    });
  }

  getBattleLog() {
    return this.battleLog;
  }

  getBattleState() {
    return {
      playerHp: this.player.currentHp,
      playerMaxHp: this.player.maxHp,
      opponentHp: this.opponent.currentHp,
      opponentMaxHp: this.opponent.maxHp,
      battleEnded: this.battleEnded,
      winner: this.winner,
      turn: this.turn
    };
  }
}

export default BattleService;
