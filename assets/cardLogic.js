// Picks the emojis depending on which button gets pressed:
function pickContents(difficulty) {
  switch(difficulty) {
    case "easy":
      return easyCards;
    case "medium":
      return mediumCards;
    case "hard":
      return hardCards;
    default:
      throw new Error("Pick a proper difficulty!")
  }
}

// Generates the contents to render onto the board based on the difficulty chosen:
// This function is also based off the cards.js storage file!
function generateCardContent(difficulty, shuffledArray) {
  let cardsToRender = [], usedContent = [], cardData = pickContents(difficulty);

  switch (difficulty.toLowerCase()) {
    case "easy":
      for (let i = 0 ; i < shuffledArray.length ; i++) {
        cardsToRender.push(`
          <div class = 'card' id = ${cardData.ids[shuffledArray[i]]}>
            <div class = 'card-front'> </div>
            <div class = 'card-back'> ${`<img src = "${cardData['images'][shuffledArray[i]]}">`} </div>
          </div>
        `)
        usedContent.push(easyCards.ids[shuffledArray[i]]);
      }
      break;
    case "medium":
    case "hard":
      for (let i = 0 ; i < shuffledArray.length ; i++) {
        cardsToRender.push(`
          <div class = 'card' id = ${cardData.ids[shuffledArray[i]]}>
            <div class = 'card-front'> </div>
            <div class = 'card-back'> ${usedContent.includes(cardData['ids'][shuffledArray[i]]) ? (cardData['images'][shuffledArray[i]].split('/')[0] == 'assets' ? `<img src = "${cardData['images'][shuffledArray[i]]}">` : cardData['images'][shuffledArray[i]]) : cardData['descs'][shuffledArray[i]]} </div>
          </div>
        `)
        usedContent.push(cardData.ids[shuffledArray[i]]);
      }
      break;
    default:
      throw new Error("Invalid difficulty chosen - please check cardLogic.js!");
  }

  return cardsToRender;
}
