import { lowerCase, title } from 'change-case';
import SITE_DATA from './SITE_DATA';

const docs = SITE_DATA.children
  .find(item => item.id === 'docs')
  .children
  .filter(item => item.type === 'dir')
  .sort((a, b) => {
    if (a.id > b.id) {
      return 1;
    }
    if (a.id < b.id) {
      return -1;
    }
    return 0;
  })
  .reduce((prev, docItem) => prev.concat([{
    id: fixId(docItem.id),
    name: docItem.id,
    title: extractTitle(docItem.id),
    pages: docItem.children
      .sort((a, b) => {
        if (a.id > b.id) {
          return 1;
        }
        if (a.id < b.id) {
          return -1;
        }
        return 0;
      })
      .map(page => ({
        ...page,
        id: fixId(page.id),
        name: page.id,
        title: extractTitle(page.id),
      }))
  }]), []);

const pkgs = SITE_DATA.children
  .find(item => item.id === 'packages')
  .children
  .filter(item => item.type === 'dir')
  .reduce((prev, pkgItem) => {
    const componentsMetadataDir = pkgItem.children.find(item => item.id === 'src') || { children: [] };
    const componentsMetadata = componentsMetadataDir.children;
    const docDir = pkgItem.children.find(item => item.id === 'docs');
    const sampleDir = pkgItem.children.find(item => item.id === 'examples');
    const pkgJson = pkgItem.children.find(item => item.id.match(/\.json$/));
    const mainDocs = docDir ? docDir.children : [];
    const samples = sampleDir ? sampleDir.children : [];
    const subDocDir = mainDocs.find(doc => doc.id === 'docs');
    const subDocs = subDocDir ? subDocDir.children : [];
    const id = fixId(pkgItem.id);

    return prev.concat([{
      ...pkgItem,
      id,
      title: extractTitle(id),
      componentsMetadata,
      pkgJson,
      docs: subDocs
        .sort((a, b) => {
          if (a.id > b.id) {
            return 1;
          }
          if (a.id < b.id) {
            return -1;
          }
          return 0;
        })
        .map(doc => ({
          ...doc,
          id: fixId(doc.id),
          name: doc.id,
          title: extractTitle(doc.id),
        })),
      examples: samples
        .sort((a, b) => {
          if (a.id > b.id) {
            return 1;
          }
          if (a.id < b.id) {
            return -1;
          }
          return 0;
        })
        .map(sample => ({
          ...sample,
          id: fixId(sample.id),
          name: sample.id,
          title: extractSampleTitle(sample.id),
        })),
      intro: mainDocs.find(item => fixId(item.id) === 'intro'),
      usage: mainDocs.find(item => fixId(item.id) === 'usage'),
      style: mainDocs.find(item => fixId(item.id) === 'style'),
    }]);
  }, [])
  .sort((a, b) => {
    if (a.id > b.id) {
      return 1;
    }
    if (a.id < b.id) {
      return -1;
    }
    return 0;
  });

export const getDocs = () => docs;
export const getPkgs = () => pkgs;
export const getPackage = pkgId => pkgs.find(pkg => pkg.id === pkgId);

function fixId(docId) {
  return docId.replace(/[0-9]+-/, '').replace(/\.(js|md)$/, '');
}
function extractTitle(docId) {
  return title(fixId(docId).replace(/-/g, ' '));
}
function extractSampleTitle(docId) {
  return lowerCase(extractTitle(docId));
}
