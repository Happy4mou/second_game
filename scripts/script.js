const maze_canvas = document.getElementById("mazeCanvas");
const ctx = maze_canvas.getContext("2d");
console.log(ctx);


class Map
{
    map = [];
    str_easy = 
              ["111111111111111111111111111111111",
               "100010001000010001000010001000001",
               "101110111011101110111011101110101",
               "100000000000000000000000000000001",
               "111011101110111011101110111011101",
               "100000001000010000000010000000001",
               "101110111011101110111011101110101",
               "100000000000000000000000000000001",
               "101110111011101110111011101110101",
               "100000001000010000000010000000001",
               "111011101110111011101110111011101",
               "100000000000000000000000000000001",
               "101110111011101110111011101110101",
               "100000001000010000000010000000001",
               "111011101110111011101110111011101",
               "100000000000000000000000000000001",
               "111111111111111111111111111111111"];

    str_mediom = 
                ["111111111111111111111111111111111",
                 "L00010001000C100000001C100010000R",
                 "101110111011101110111101101110101",
                 "100000000000000000000000000000001",
                 "111011101110111011101110111011101",
                 "100C000010000100000000100000C0001",
                 "101110111011101110111011101110101",
                 "100000000000000000000000000000001",
                 "101110111011101110111011101110101",
                 "100C000010000100000000100000C0001",
                 "111011101110111011101110111011101",
                 "100000000000000000000000000000001",
                 "101110111011101110111101101110101",
                 "100010001010C010000001C1000100011",
                 "111111111111111111111111111111111"];
    
    str_hard = 
                ["111111111111111111111111111111111",
                "100C10001000100001000100001000101",
                "101110111011101110111011101110101",
                "100000000000000000000000000000001",
                "111011101110111011101110111011101",
                "100000001000010000000010000000001",
                "101110111011101110111011101110101",
                "100000000000000000000000000000001",
                "101110111011101110111011101110101",
                "100000001000010000000010000000001",
                "111011101110111011101110111011101",
                "100000000000000000000000000000001",
                "101110111011101110111011101110101",
                "100010001000010001C10001000100001",
                "111111111111111111111111111111111"];


    constructor() {};
    impliment_map(level){};

}

Map.prototype.impliment_map = function(level)
{
    row = [];
    str_map = "";
    switch(level)
    {
        case "easy":
            str_map = this.str_easy;
            break;
        case "mediom":
            str_map = this.str_mediom;
            break;
        case "hard":
            str_map = this.str_hard;
            break;
        default:
            str_map = "";
    }
    if(str_map !== "")
    {
        this.map = str_map.map(row => row.split(''));
    }
}

const maze = new Map;
maze.impliment_map("mediom");

const colors = {
    '1' : '#02c39a',
    '0' : '#000000',
    'C' : '#fdf0d5',
    'L' : '#d81159',
    'R' : '#d81159',
}

const L_player = {
    sympol : 'L',
    x : 0 , y : 1,
    Score : 0
}
const R_player = {
    sympol : 'R',
    x : maze.map[0].length -1 , y : 1,
    Score : 0
}

let move_tab = [];
let tab_index = 0;
let var_interval ;
let key_stat = {};

document.addEventListener('keydown' , function(event)
{
    key_stat[event.key] = true;
})

document.addEventListener('keyup' , function(event)
{
    key_stat[event.key] = false;
})


function draw_maze()
{
    // const length_of_maze = maze.map.length * maze.map[0].length;
    // const rec_width = maze_canvas.width / maze.map[0].length;
    // const rec_height = maze_canvas.height / maze.map.length;
    // console.log(maze.map.length ,'   ',maze.map[0].length)
    cellSize = 30 ;
    const gridWidth = maze.map[0].length * cellSize;
    const gridHeight = maze.map.length * cellSize;
    maze_canvas.width = gridWidth;
    maze_canvas.height = gridHeight;

    for(let i = 0 ; i < maze.map.length ; i++)
    {
        for(let j = 0 ; j < maze.map[0].length ; j++)
        {
            const cell = maze.map[i][j];
            ctx.fillStyle = colors[cell];
            ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
            // console.log(j *rec_height  ,"   ",i * rec_width );
        }
    }
}

function move_players(player , dx , dy)
{
    console.log("in function");

    let player_for_move = {};
    
    if (player === 'L')
    {
        player_for_move = L_player;
    }
    else
    {
        player_for_move = R_player;
    }

    const newX = player_for_move.x + dx;
    const newY = player_for_move.y + dy;
    
    console.log(player_for_move.x, "  " ,player_for_move.y);
    if (newX >= 0 && newX < maze.map[0].length &&  newY >= 0 && newY < maze.map.length)
    {
        const dest = maze.map[newY][newX];
        if(dest !== '1' && (dest !== 'L' && dest !== 'R'))
            {
                if(dest === 'C')
                    {
                        player_for_move.Score++;
                    }
                maze.map[player_for_move.y][player_for_move.x] = '0';
                player_for_move.x = newX;
                player_for_move.y = newY;
                maze.map[player_for_move.y][player_for_move.x] = player_for_move.sympol;
            }
    }
}

function Game_over()
{
    if(!maze.map.flat().includes('C'))
        {
            alert(`Game Over!\nPlayer 1 (L) Score: ${L_player.Score}\nPlayer 2 (R) Score: ${R_player.Score}`);
            clearInterval(var_interval);
        }
}

function moves_update()
{
    console.log("in moves_update");
    if(key_stat['ArrowUp']) move_players( 'R' , 0 , -1);
    if(key_stat['ArrowDown']) move_players( 'R' , 0 , 1);
    if(key_stat['ArrowRight']) move_players( 'R' , 1 , 0);
    if(key_stat['ArrowLeft']) move_players( 'R' , -1 , 0);

    if(key_stat['w']) move_players( 'L' , 0 , -1);
    if(key_stat['s']) move_players( 'L' , 0 , 1);
    if(key_stat['d']) move_players( 'L' , 1 , 0);
    if(key_stat['a']) move_players( 'L' , -1 , 0);

    draw_maze();
    Game_over();
}


function game_loop()
{
    moves_update();
}


draw_maze();
setInterval(game_loop, 55);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// class Map{

//     map_init = [];
//     random_cell = [];
//     path = [];
//     #_easy_map = [];
//     #_mediom_map = [];
//     #_hard_map = [];
//     constructor() {}
//     get_ramdom_cell(){}
//     implement_map() {}
//     get_next_path() {}
//     init_map(rows , columns) {}
//     set_easy_map(rows , columns) {}
//     set_mediom_map(rows , columns) {}
//     set_hard_map(rows , columns) {}

// }



// Map.prototype.get_ramdom_cell = function()
// {
//     const length_culumn = this.map_init[0].length;
//     const length_row = this.map_init.length;

//     const cell_row = Math.floor(Math.random() * length_row);
//     const cell_column = Math.floor(Math.random() * length_culumn);
//     this.random_cell.push(cell_row , cell_column);
// }

// Map.prototype.set_easy_map = function(rows , columns)
// {
//     this._easy_map = this.init_map(rows , columns);
// }

// Map.prototype.set_mediom_map = function(rows , columns)
// {
//     this._mediom_map = this.init_map(rows , columns);

// }

// Map.prototype.set_hard_map = function(rows , columns)
// {
//     this._hard_map = this.init_map(rows , columns);

// }

// Map.prototype.init_map = function(rows , columns)
// {
//     for (let i = 0 ; i < rows ; i++){
//         const row = [];
//         for (let j = 0 ; j < columns ; j++){
//                     row.push(0);
//             }
//         this.map_init.push(row);
//     }
// }

// Map.prototype.get_next_path = function() {
//     let i = this.random_cell[0];
//     let j = this.random_cell[1];
//     const random_next = Math.floor(Math.random() * 4);

//     switch (random_next) {
//         case 0: // Move left
//             if (j > 0 && this.map_init[i][j - 1] === 0) {
//                 return [i, j - 1];
//             }
//             break;
//         case 1: // Move right
//             if (j < this.map_init[0].length - 1 && this.map_init[i][j + 1] === 0) {
//                 return [i, j + 1];
//             }
//             break;
//         case 2: // Move up
//             if (i > 0 && this.map_init[i - 1][j] === 0) {
//                 return [i - 1, j];
//             }
//             break;
//         case 3: // Move down
//             if (i < this.map_init.length - 1 && this.map_init[i + 1][j] === 0) {
//                 return [i + 1, j];
//             }
//             break;
//     }
//     return null;
// }

// Map.prototype.implement_map = function() {
//     this.path.push([this.random_cell[0], this.random_cell[1]]);
//     this.map_init[this.random_cell[0]][this.random_cell[1]] = 1;

//     while (this.path.length > 0) {
//         const next_path = this.get_next_path();
//         if (next_path) {
//             this.map_init[next_path[0]][next_path[1]] = 1;
//             this.path.push(next_path);
//             this.random_cell = next_path; // Update the current cell
//         } else {
//             this.path.pop(); // Backtrack
//             if (this.path.length > 0) {
//                 this.random_cell = this.path[this.path.length - 1];
//             }
//         }
//     }
//     console.log(this.map_init);
// }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Map.prototype.get_next_path = function()
// {
//     let i = this.random_cell[0]
//     let j = this.random_cell[1]
//     const random_next = Math.floor(Math.random() * 10000000) % 4;
//     switch(random_next)
//     {
//         case 0:
//             if(this.map_init[i][j - 1] === 0)
//                 {
//                     return [i , j - 1];
//                 }
//             else
//                 {
//                     this.get_next_path();
//                 }
//             break;
//         case 1:
//             if(this.map_init[i][j + 1] === 0)
//                 {
//                     return [i , j + 1];
//                 }
//             else
//                 {
//                     this.get_next_path();
//                 }
//             break;
//         case 2:
//             if(this.map_init[i - 1][j] === 0)
//                 {
//                     return [i -1 , j];
//                 }
//             else
//                 {
//                     this.get_next_path();
//                 }
//             break;
//         case 3:
//             if(this.map_init[i + 1][j] === 0)
//                 {
//                     return [i + 1 , j];
//                 }
//             else
//                 {
//                     this.get_next_path();
//                 }
//             break;
//         default:
//             return -1; 
//     }
//     return -1;
// }

// Map.prototype.implement_map = function()
// {
//     // map_rows = [];
//     // for (let i = 0 ; i < rows ; i++)
//     //     {
//     //         count  = 0;
//     //         const row = [];
//     //         for (let j = 0 ; j < columns ; j++)
//     //             {
//     //                 if(i === 0 || (j === 0 && i !== 1) || i === rows - 1  || (j === columns -1 && i !== rows - 2)){
//     //                     row.push(1);
//     //                 }
//     //                 else if((i === 1 && j === 0) || ((i === rows - 2  && j === columns - 1))){
//     //                     row.push(0);
//     //                 }
//     //                 else if ( i > 1 && map_rows[i - 1][j] !== 1  && row[j -1] !== 1){
//     //                     if (count % tocken_space){
//     //                         row.push(2);
//     //                     }
//     //                     row.push(0);
//     //                 }
//     //                 else
//     //                 {
//     //                     row.push(1);
//     //                 }
//     //             }
//     //         console.log(row);
//     //         map_rows.push(row);
//     //     }
//     // map_rows = [];
//     this.path.push([this.random_cell[0] , this.random_cell[1]]);
//     this.map_init[this.random_cell[0]][this.random_cell[1]] = 1;
//     while(this.path)
//         {
//             next_path = this.get_next_path();
//             if(next_path !== -1)
//             {
//                     this.map_init[next_path[0] , next_path[1]]
//                     this.path.push([next_path[0] , next_path[1]]);
//             }
//             else
//             {
//                 this.path.push([next_path[0] , next_path[1]]);
//                 this.path.pop();
//             }
//             console.log(this.map_init[next_path[0] , next_path[1]]);
//         }
//     // return map_rows;
// }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// push_keys(key)
// {
//     if(move_tab.length == 0 || move_tab[tab_index] !== key)
//     {
//         move_tab.push(key);
//         tab_index++;
//     }
// }

// function save_moves()
// {
//     document.addEventListener('keydown' , function(event)
//     {
//         switch(event.key)
//         {
//             case 'ArrowUp':
//                 push_keys('ArrowUp');
//              console.log("UP1"); 
//              break;
//             case 'ArrowDown': 
//              push_keys('ArrowDown');
//              console.log("DOWN1");
//               break;
//             case 'ArrowRight': 
//              push_keys('ArrowRight');
//              ; break;
//             case 'ArrowLeft': 
//              push_keys('ArrowLeft');
//              console.log("LEFT1");
//               break;

//             case 'w': 
//              push_keys('w');
//              console.log("UP"); 
//              break;
//             case 's': 
//              push_keys('s');
//              console.log("DOWN");
//              break;
//             case 'd':
//              push_keys('d'); 
//              console.log("RIGHT");
//               break;
//             case 'a': 
//              push_keys('a');
//              console.log("LEFT"); 
//              break;

//             default :
//                 break;
//         }
//     })
// }

// pop_from_move_tap()
// {
//     move_tab.pop();
//     tab_index--;
// }

// key_up_f()
// {
//     document.addEventListener('keyup' , function(event)
//     {
//         switch(event.key)
//         {
//             case 'ArrowUp':
//                 pop_from_move_tap()
//              console.log("UP1"); 
//              break;
//             case 'ArrowDown':
//                 pop_from_move_tap()
//              console.log("DOWN1");
//               break;
//             case 'ArrowRight':
//                 pop_from_move_tap() 
//              ; break;
//             case 'ArrowLeft':
//                 pop_from_move_tap() 
//              console.log("LEFT1");
//               break;

//             case 'w':
//                 pop_from_move_tap() 
//              console.log("UP"); 
//              break;
//             case 's':
//                 pop_from_move_tap() 
//              console.log("DOWN");
//              break;
//             case 'd':
//                 pop_from_move_tap()
//              console.log("RIGHT");
//               break;
//             case 'a':
//                 pop_from_move_tap() 
//              console.log("LEFT"); 
//              break;

//             default :
//                 break;
//         }
//     })
// }

// function handel_moves()
// {
//     while(tab_index > 0)
//     {

//         switch(move_tab[tab_index])
//         {
//             case 'ArrowUp': 
//                 move_players( 'R' , 0 , -1);
//                 key_up_f();
//                 console.log("UP1"); 
//                 break;
//             case 'ArrowDown': 
//                 move_players( 'R' , 0 , 1); 
//                 key_up_f();
//                 console.log("DOWN1"); 
//                 break;
//             case 'ArrowRight': 
//                 move_players( 'R' , 1 , 0); 
//                 key_up_f();
//                 console.log("RIGHT1"); 
//                 break;
//             case 'ArrowLeft': 
//                 move_players( 'R' , -1 , 0);
//                 key_up_f(); 
//                 console.log("LEFT1"); 
//                 break;

//             case 'w': 
//                 move_players( 'L' , 0 , -1);
//                 key_up_f(); 
//                 console.log("UP"); 
//                 break;
//             case 's': 
//                 move_players( 'L' , 0 , 1); 
//                 key_up_f();
//                 console.log("DOWN"); 
//                 break;
//             case 'd': 
//                 move_players( 'L' , 1 , 0); 
//                 key_up_f();
//                 console.log("RIGHT"); 
//                 break;
//             case 'a': 
//                 move_players( 'L' , -1 , 0);
//                 key_up_f(); 
//                 console.log("LEFT"); 
//                 break;

//             default :
//                 break;
//         }
//     }
// }
// keydown_event();
// easy_map.set_easy_map(5 ,8);
// easy_map.get_ramdom_cell();
// easy_map.implement_map();
// console.log(h);
// let array_easy_map = [];
// array_easy_map = easy_map.set_easy_map(5 , 8 , 2);
// console.log("array_easy_map: ", array_easy_map);


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
