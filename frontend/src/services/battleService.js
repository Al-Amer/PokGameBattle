// Battle moves data
export const moves = {
  tackle: { name: "Tackle", type: "normal", power: 40, accuracy: 100 },
  scratch: { name: "Scratch", type: "normal", power: 40, accuracy: 100 },
  ember: { name: "Ember", type: "fire", power: 40, accuracy: 100 },
  waterGun: { name: "Water Gun", type: "water", power: 40, accuracy: 100 },
  vineWhip: { name: "Vine Whip", type: "grass", power: 40, accuracy: 100 },
  thunderShock: { name: "Thunder Shock", type: "electric", power: 40, accuracy: 100 },
  quickAttack: { name: "Quick Attack", type: "normal", power: 40, accuracy: 100 },
  growl: { name: "Growl", type: "normal", power: 0, accuracy: 100, effect: "lower_attack" }
};

// Type effectiveness
const typeEffectiveness = {
  fire: { grass: 2, ice: 2, bug: 2, water: 0.5, rock: 0.5 },
  water: { fire: 2, ground: 2, rock: 2, grass: 0.5, electric: 0.5 },
  grass: { water: 2, ground: 2, rock: 2, fire: 0.5, ice: 0.5 },
  electric: { water: 2, flying: 2, grass: 0.5, ground: 0 }
};

class BattleService {
  constructor(playerPokemon, opponentPokemon) {
    this.player = {
      ...playerPokemon,
      currentHp: playerPokemon.stats?.hp || 100,
      maxHp: playerPokemon.stats?.hp || 100,
      name: playerPokemon.name,
      types: playerPokemon.types || ['normal'],
      stats: playerPokemon.stats || { attack: 50, defense: 50, speed: 50 }
    };
    this.opponent = {
      ...opponentPokemon,
      currentHp: opponentPokemon.stats?.hp || 100,
      maxHp: opponentPokemon.stats?.hp || 100,
      name: opponentPokemon.name,
      types: opponentPokemon.types || ['normal'],
      stats: opponentPokemon.stats || { attack: 50, defense: 50, speed: 50 }
    };
    this.battleLog = [];
    this.battleEnded = false;
    this.winner = null;
    this.turn = 'player';
    this.waitingForOpponent = false;
  }

  calculateDamage(attacker, defender, move) {
    const attackType = move.type;
    const defenderType = defender.types[0];
    let effectiveness = typeEffectiveness[attackType]?.[defenderType] || 1;
    
    let damage = Math.floor((move.power * (attacker.stats.attack || 50) / (defender.stats.defense || 50)) + 2);
    damage *= effectiveness;
    damage *= (0.85 + Math.random() * 0.3);
    
    const isCritical = Math.random() < 0.0625;
    if (isCritical) {
      damage *= 1.5;
      this.addLog(`✨ Critical hit! ✨`, 'critical');
    }
    
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
    
    this.addLog(`${this.player.name} used ${move.name}!`, 'action');
    
    if (move.power === 0) {
      this.addLog(`${this.opponent.name}'s attack fell!`, 'effect');
      this.turn = 'opponent';
      return { damage: 0, hit: true, moveDone: true };
    }
    
    const damage = this.calculateDamage(this.player, this.opponent, move);
    this.opponent.currentHp = Math.max(0, this.opponent.currentHp - damage);
    this.addLog(`💥 It dealt ${damage} damage!`, 'damage');
    
    if (this.opponent.currentHp <= 0) {
      this.battleEnded = true;
      this.winner = 'player';
      this.addLog(`${this.opponent.name} fainted! 🏆`, 'win');
      return { damage, battleEnded: true };
    }
    
    this.turn = 'opponent';
    return { damage, hit: true, moveDone: true };
  }

  opponentAttack() {
    if (this.battleEnded || this.turn !== 'opponent') return null;
    
    const availableMoves = ['tackle', 'quickAttack'];
    const moveName = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    const move = moves[moveName];
    
    this.addLog(`${this.opponent.name} used ${move.name}!`, 'action');
    
    const damage = this.calculateDamage(this.opponent, this.player, move);
    this.player.currentHp = Math.max(0, this.player.currentHp - damage);
    this.addLog(`💥 It dealt ${damage} damage!`, 'damage');
    
    if (this.player.currentHp <= 0) {
      this.battleEnded = true;
      this.winner = 'opponent';
      this.addLog(`${this.player.name} fainted! 💔`, 'lose');
      return { damage, battleEnded: true };
    }
    
    this.turn = 'player';
    return { damage, hit: true };
  }

  addLog(message, type = 'info') {
    this.battleLog.push({ text: message, type, timestamp: Date.now() });
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
