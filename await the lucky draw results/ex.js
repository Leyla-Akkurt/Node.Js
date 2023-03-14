function luckyDraw(player) {
    return new Promise((resolve, reject) => {
      const win = Boolean(Math.round(Math.random()));

      process.nextTick(() => {
        if (win) {
          resolve(`${player} won a prize in the draw!`);
        } else {
          reject(new Error(`${player} lost the draw.`));
        }
      });
    });
  }

async function getResults(){
   const value1= await luckyDraw("Tina");
   console.log(value1);

   const value2= await luckyDraw("Jorge");
   console.log(value2);

   const value3= await luckyDraw("Julien");
   console.log(value3);

}
getResults();
