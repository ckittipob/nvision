interface IDimesions {
    height: number;
    width: number;
}

export const getImageDimensions = (file:string ):Promise<IDimesions> => {
    
    return new Promise (function (resolved, rejected) {
      var i = new Image()
      i.onload = function(){
        resolved({width: i.width, height: i.height})
      };
      i.src = file
    })
  }