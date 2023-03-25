import { Queue } from '../core/queue';
import { createRef } from 'react';

export class RadioInfos {
  names: string[];
  refs: React.RefObject<HTMLInputElement>[] = [];

  constructor(radioNames: string[]) {
    this.names = radioNames;
    for (let i = 0; i < radioNames.length; i++) this.refs.push(createRef<HTMLInputElement>());
  }

  clear() {
    this.refs.forEach((e) => {
      if (e.current) e.current.checked = false;
    });
  }

  selectedIndex(): number | null {
    for (let i = 0; i < this.refs.length; i++) if (this.refs[i].current?.checked) return i;

    return -1;
  }
}

export default class Refs {
  static CACHED_IMAGES = 8;

  refTitle: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  refText: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  refPrice: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  refAdded: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  refSelect: React.RefObject<HTMLSelectElement> = createRef<HTMLSelectElement>();
  refGray: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  refImg: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();

  refRadios: RadioInfos;

  oldimages: Queue<string> = new Queue<string>();

  constructor(radioNames: string[]) {
    this.refRadios = new RadioInfos(radioNames);
  }

  reset() {
    if (this.refTitle.current) this.refTitle.current.value = '';
    if (this.refText.current) this.refText.current.value = '';
    if (this.refPrice.current) this.refPrice.current.value = '';
    if (this.refAdded.current) this.refAdded.current.value = '';
    if (this.refSelect.current) this.refSelect.current.value = '';
    if (this.refGray.current) this.refGray.current.checked = false;
    if (this.refImg.current) this.refImg.current.value = '';
    this.refRadios.clear();
  }

  formImageURL(permanent: boolean): string | undefined {
    while (this.oldimages.size() >= Refs.CACHED_IMAGES) {
      URL.revokeObjectURL(this.oldimages.dequeue());
    }

    if (this.refImg.current && this.refImg.current.files && this.refImg.current.files.length > 0) {
      const file = this.refImg.current.files[0];
      const url = URL.createObjectURL(file);
      if (!permanent) this.oldimages.enqueue(url);
      return url;
    }
    return undefined;
  }
}
