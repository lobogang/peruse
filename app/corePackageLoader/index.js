// TODO: This should load all packages either from here or from node_modules etc...
import initSafeBrowsing from './safeBrowsing.js';

// here add your packages for extensibility.
const allPackages = [ initSafeBrowsing ];


const loadCorePackages = ( store ) =>
{
    allPackages.forEach( pack => pack( store ) );
};


export default loadCorePackages;
