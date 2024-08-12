const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");
console.log(ctx);

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
                 "100010001000C100010001C1000100011",
                 "101110111011101110111011101110101",
                 "100000000000000000000000000000001",
                 "111011101110111011101110111011101",
                 "100C000010000100000000100000C0001",
                 "101110111011101110111011101110101",
                 "100000000000000000000000000000001",
                 "101110111011101110111011101110101",
                 "100C000010000100000000100000C0001",
                 "111011101110111011101110111011101",
                 "100000000000000000000000000000001",
                 "101110111011101110111011101110101",
                 "100010001000C100010001C1000100011",
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
                "111111111111111111111111111111111"]


    constructor()
    {
        // if(level === "easy")
        //     {
        //         impliment_map("easy");
        //     }
        // if(level === "mediom")
        //     {
        //         impliment_map("mediom");
        //     }
        // if(level === "hard")
        //     {
        //         impliment_map("hard");
        //     }
    }
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
        this.map = str_map.map(row => row.split(''))
    }
}

const easy_map = new Map;
easy_map.impliment_map("mediom");
console.log(easy_map.map);
// easy_map.set_easy_map(5 ,8);
// easy_map.get_ramdom_cell();
// easy_map.implement_map();
// console.log(h);
// let array_easy_map = [];
// array_easy_map = easy_map.set_easy_map(5 , 8 , 2);
// console.log("array_easy_map: ", array_easy_map);


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
