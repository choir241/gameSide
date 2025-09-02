# Characters 

# Positions
| **Position** | **Atk** | **Spd** | **Magic Atk** | **Def** | **Magic Def** | **Health** |
|--------------|---------|---------|---------------|---------|---------------|------------|
| **Front**    | ++      | ++      | ++            | --      | --            | --         |
| **Pace**     | +       | ++      | +             | -       | -             | -          |
| **Late**     | +       | ---     | ++            | +       | +             | +          |
| **End**      | +/-     | -       | +/-           | ++      | ++            | ++         |

# Stats

## Atk
Determines how much damage a character does, subtracting from their opponents health after calculating in their def stat 
## Def
Determines how much less the atk stat does from their opponent (atk - def)
## Magic Atk
Determines how much damage a character does, subtracting from their opponents health after calculating in their magic def stat 
## Magic Def
Determines how much less the atk stat does from their opponent (magic atk - def)
## Speed
Determines how moves first in the turn order
## Health
If this hits zero, the character can no longer do an action
## Mana points
If this hits zero, the character can no longer use magic

# Hidden Stats
Stats that aren't shown but can be improved from their support party
## Critical Chance (max is 50%)
Determines the chance of the character hitting a critical chance
## Citical Damage (exponential at start, but flattens as more stats are improved on)
Determines how much more damage the character will do when hitting a critical hit
## Experience
Determines when the character will level up. When the character levels up, the player is allowed to pick from a stat to improve. Every 5 levels, the character will unlock a new skill that the player can select to unlock to purchase with their skill points, or pick from a stat to improve on instead.
## Mood
Goes from Awful - Bad - Normal - Good - Great. Mood can affect how your character (including in your team) performs. They are as follows:
| Mood    | Experience Points     | Gold                | Status Effect Affliction/Resistance                                     |
|---------|-----------------------|---------------------|-------------------------------------------------------------------------|
| **Awful** | -10%                 | -10%                | +30% chance of receiving status effect when attacked                      |
| **Bad**   | -5%                  | -5%                 | +20% chance of receiving status effect when attacked                      |
| **Normal**| No effect            | No effect           | No effect                                                               |
| **Good**  | +2%                  | +2%                 | +20% chance of resisting status effect when attacked                      |
| **Great** | +3%                  | +3%                 | +30% chance of resisting status effect when attacked                      |

# Options

## Fight (Takes up one turn)
Fight the tower floor enemies, where you will be rewarded with the following after victory:

- Gain some gold
- A chance for a drop item
- Experience points
- Skill points

## Inventory
Select from the items you possess to use on yourself before/during a fight for the current floor
## Skills
Select skills to buy with your skill points

## Tavern (Takes up one turn)

Every new playthrough starts with 0 support party members at the start.
Every new playthrough starts with 100 gold.
Every new playthrough starts with 20 skill points and 4 skills.

You can select from the following when going to the Tavern:

### Rest (cost 10 gold)
Heals your character and all characters health in your team, fills mana points to maximum, and increases mood to great. Gold cost will increase each visit (first visit: 10 gold -> 11 gold. second visit: 11 gold -> 13 gold)
### Camp (cost free)
Heals your character and all characters health by 50% in your team and fills mana points by 50% (health & mana recovery scales downward the more you use it ie. first camp 50% -> 48%. Second camp 48% -> 45%. Resting will reset back to 100%)
## Recruit (cost 20 gold)
From randomly selected 2 characters (number increases as you get higher in the tower levels, maxing at 10), select a character to recruit to your party.
## Market (cost varies)
Go to the market and you can purchase the following to improve your parties chances to become more victorious:
- Weapons
- Armor and accessories
- One-time use recovery itmes
- Reusuable items