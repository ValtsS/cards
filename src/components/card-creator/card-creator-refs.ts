import { Queue } from '@/core/queue';
import { createRef } from 'react';

export class RadioInfos {
  names: string[];
  refs: React.RefObject<HTMLInputElement>[] = [];

  constructor(radioNames: string[]) {
    this.names = radioNames;
    this.refs = radioNames.map(() => createRef<HTMLInputElement>());
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
  refForm: React.RefObject<HTMLFormElement> = createRef<HTMLFormElement>();

  refRadios: RadioInfos;

  oldimages: Queue<string> = new Queue<string>();

  constructor(radioNames: string[]) {
    this.refRadios = new RadioInfos(radioNames);
  }

  reset() {
    this.refForm.current?.reset();
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
