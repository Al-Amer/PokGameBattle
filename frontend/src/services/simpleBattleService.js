// Simple battle moves
export const moves = {
  tackle: { name: "Tackle", type: "normal", power: 40 },
  scratch: { name: "Scratch", type: "normal", power: 40 },
  ember: { name: "Ember", type: "fire", power: 40 },
  waterGun: { name: "Water Gun", type: "water", power: 40 },
  vineWhip: { name: "Vine Whip", type: "grass", power: 40 },
  thunderShock: { name: "Thunder Shock", type: "electric", power: 40 },
  growl: { name: "Growl", type: "normal", power: 0, effect: "lower_attack" },
  tailWhip: { name: "Tail Whip", type: "normal", power: 0, effect: "lower_defense" }
};

// Type effectiveness
const typeEffectiveness = {
  fire: { grass: 2, ice: 2, bug: 2, water: 0.5, rock: 0.5 },
  water: { fire: 2, ground: 2, rock: 2, grass: 0.5, electric: 0.5 },
  grass: { water: 2, ground: 2, rock: 2, fire: 0.5, ice: 0.5 },
  electric: { water: 2, flying: 2, grass: 0.5, ground: 0 }
};

class SimpleBattleService {
  constructor(playerPokemon, opponentPokemon) {
    this.player = {
      ...playerPokemon,
      currentHp: playerPokemon.stats.hp,
      attackMod: 0,
      defenseMod: 0
    };
    this.opponent = {
      ...opponentPokemon,
      currentHp: opponentPokemon.stats.hp,
      attackMod: 0,
      defenseMod: 0
    };
    this.battleLog = [];
    this.battleEnded = false;
    this.winner = null;
  }

  useMove(moveName, isPlayer = true) {
    if (this.battleEnded) return null;
    
    const move = moves[moveName];
    if (!move) return null;
    
    const attacker = isPlayer ? this.player : this.opponent;
    const defender = isPlayer ? this.opponent : this.player;
    const attackerName = isPlayer ? this.player.name : this.opponent.name;
    const defenderName = isPlayer ? this.opponent.name : this.player.name;
    
    this.addLog(`${attackerName} used ${move.name}!`);
    
    // Status moves
    if (move.power === 0) {
      if (move.effect === 'lower_attack') {
        defender.attackMod--;
        this.addLog(`${defenderName}'s attack fell!`);
      } else if (move.effect === 'lower_defense') {
        defender.defenseMod--;
        this.addLog(`${defenderName}'s defense fell!`);
      }
      return { damage: 0 };
    }
    
    // Calculate damage
    let attackStat = attacker.stats.attack;
    let defenseStat = defender.stats.defense;
    
    // Apply stat modifications
    if (attacker.attackMod > 0) attackStat *= (1 + attacker.attackMod * 0.5);
    if (attacker.attackMod < 0) attackStat /= (1 + Math.abs(attacker.attackMod) * 0.5);
    if (defender.defenseMod > 0) defenseStat *= (1 + defender.defenseMod * 0.5);
    if (defender.defenseMod < 0) defenseStat /= (1 + Math.abs(defender.defenseMod) * 0.5);
    
    let damage = Math.floor((move.power * attackStat / defenseStat) + 2);
    
    // Type effectiveness
    const effectiveness = typeEffectiveness[move.type]?.[defender.types[0]] || 1;
    damage *= effectiveness;
    
    if (effectiveness > 1) this.addLog(`It's super effective!`);
    if (effectiveness < 1) this.addLog(`It's not very effective...`);
    
    // Critical hit (10% chance)
    const isCritical = Math.random() < 0.1;
    if (isCritical) {
      damage *= 1.5;
      this.addLog(`Critical hit!`);
    }
    
    damage = Math.max(1, Math.floor(damage));
    defender.currentHp = Math.max(0, defender.currentHp - damage);
    this.addLog(`It dealt ${damage} damage!`);
    
    // Check for defeat
    if (defender.currentHp <= 0) {
      this.battleEnded = true;
      this.winner = isPlayer ? 'player' : 'opponent';
      this.addLog(`${defenderName} fainted!`);
      this.addLog(`${attackerName} wins!`);
    }
    
    return { damage, effectiveness, isCritical };
  }

  addLog(message) {
    this.battleLog.push({
      text: message,
      timestamp: new Date().toISOString()
    });
  }

  getBattleLog() {
    return this.battleLog;
  }

  getBattleState() {
    return {
      playerHp: this.player.currentHp,
      playerMaxHp: this.player.stats.hp,
      opponentHp: this.opponent.currentHp,
      opponentMaxHp: this.opponent.stats.hp,
      battleEnded: this.battleEnded,
      winner: this.winner
    };
  }
}

export default SimpleBattleService;
