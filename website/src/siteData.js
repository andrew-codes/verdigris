import { lowerCase, title } from 'change-case';
import SITE_DATA from './SITE_DATA';

const docs = SITE_DATA.children
  .find(item => item.id === 'docs')
  .children
  .filter(item => item.type === 'dir')
  .reduce((prev, docItem) => prev.concat([{
    id: fixId(docItem.id),
    title: extractTitle(docItem.id),
    pages: docItem.children.map(page => ({
      ...page,
      id: fixId(page.id),
      title: extractTitle(page.id),
    }))
  }]), []);

const pkgs = SITE_DATA.children
  .find(item => item.id === 'packages')
  .children
  .filter(item => item.type === 'dir')
  .reduce((prev, pkgItem) => {
    const docDir = pkgItem.children.find(item => item.id === 'docs');
    const sampleDir = pkgItem.children.find(item => item.id === 'examples');
    const mainDocs = docDir ? docDir.children : [];
    const samples = sampleDir ? sampleDir.children : [];
    const id = fixId(pkgItem.id);
    return prev.concat([{
      ...pkgItem,
      id,
      title: extractTitle(id),
      docs: [],
      examples: samples
        .map(sample => ({
          ...sample,
          id: fixId(sample.id),
          title: extractSampleTitle(sample.id),
        }))
        .sort((a, b) => {
          if (a.id > b.id) {
            return 1;
          }
          if (a.id < b.id) {
            return -1;
          }
          return 0;
        }),
      intro: mainDocs.find(item => fixId(item.id) === 'intro'),
      usage: mainDocs.find(item => fixId(item.id) === 'usage'),
      style: mainDocs.find(item => fixId(item.id) === 'style'),
    }]);
  }, []);

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
