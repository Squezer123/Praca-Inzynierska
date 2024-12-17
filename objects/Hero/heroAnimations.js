const makeAnimationFrames = (rootFrame) => {   
    return {
        duration: 400,
        frames: [
           {time: 0, frame: rootFrame}, 
           {time: 100, frame: rootFrame+1}, 
           {time: 200, frame: rootFrame+2}, 
           {time: 300, frame: rootFrame+3}, 
        ]
    
    }

}


export const STAND_DOWN = makeAnimationFrames(0);
export const STAND_RIGHT = makeAnimationFrames(4);
export const STAND_UP = makeAnimationFrames(12);
export const STAND_LEFT = makeAnimationFrames(8);

export const WALK_DOWN = makeAnimationFrames(16);
export const WALK_RIGHT = makeAnimationFrames(20);
export const WALK_LEFT = makeAnimationFrames(24);
export const WALK_UP = makeAnimationFrames(28);

export const NPC_STAND_DOWN = makeAnimationFrames(0);
export const NPC_STAND_RIGHT = makeAnimationFrames(6);
export const NPC_STAND_UP = makeAnimationFrames(12);
export const NPC_STAND_LEFT = makeAnimationFrames(8);

export const NPC_WALK_DOWN = makeAnimationFrames(16);
export const NPC_WALK_RIGHT = makeAnimationFrames(20);
export const NPC_WALK_LEFT = makeAnimationFrames(24);
export const NPC_WALK_UP = makeAnimationFrames(28);

