import projectData from './project-data';

/* eslint-disable import/no-unresolved */
import popWav from '!arraybuffer-loader!./83a9787d4cb6f3b7632b4ddfebf74367.wav?';
import meowWav from '!arraybuffer-loader!./83c36d806dc92327b9e7049a565c6bff.wav?';
import backdrop from '!raw-loader!./cd21514d0531fdffb22204e0ec5ed84a.svg?';
import costume1 from '!arraybuffer-loader!./D27242E7A606BF531BFADB942764BE12.png?';
import costume2 from '!arraybuffer-loader!./7AD771519D78ECA7D9EAC636C0400118.png?';
/* eslint-enable import/no-unresolved */

const defaultProject = translator => {
    let _TextEncoder;
    if (typeof TextEncoder === 'undefined') {
        _TextEncoder = require('fastestsmallesttextencoderdecoder').TextEncoder;
    } else {
        _TextEncoder = TextEncoder;
    }
    const encoder = new _TextEncoder();

    const projectJson = projectData(translator);
    return [{
        id: 0,
        assetType: 'Project',
        dataFormat: 'JSON',
        data: JSON.stringify(projectJson)
    }, {
        id: '83a9787d4cb6f3b7632b4ddfebf74367',
        assetType: 'Sound',
        dataFormat: 'WAV',
        data: new Uint8Array(popWav)
    }, {
        id: '83c36d806dc92327b9e7049a565c6bff',
        assetType: 'Sound',
        dataFormat: 'WAV',
        data: new Uint8Array(meowWav)
    }, {
        id: 'cd21514d0531fdffb22204e0ec5ed84a',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(backdrop)
    }, {
        id: 'D27242E7A606BF531BFADB942764BE12',
        assetType: 'ImageBitmap',
        dataFormat: 'PNG',
        data: new Uint8Array(costume1)
    }, {
        id: '7AD771519D78ECA7D9EAC636C0400118',
        assetType: 'ImageBitmap',
        dataFormat: 'PNG',
        data: new Uint8Array(costume2)
    }];
};

export default defaultProject;
