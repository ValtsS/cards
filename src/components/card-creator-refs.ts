import { Queue } from '../core/queue';
import { createRef } from 'react';

export default class Refs {
  refTitle: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  refText: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  refPrice: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  refAdded: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  refSelect: React.RefObject<HTMLSelectElement> = createRef<HTMLSelectElement>();
  refGray: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  refImg: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();

  oldimages: Queue<string> = new Queue<string>();

  reset() {
    if (this.refTitle.current) this.refTitle.current.value = '';
    if (this.refText.current) this.refText.current.value = '';
    if (this.refPrice.current) this.refPrice.current.value = '';
    if (this.refAdded.current) this.refAdded.current.value = '';
    if (this.refSelect.current) this.refSelect.current.value = '';
    if (this.refGray.current) this.refGray.current.checked = false;
    if (this.refImg.current) this.refImg.current.value = '';
  }

  formImageURL(permanent: boolean): string | undefined {
    while (this.oldimages.size() > 8) {
      const oldur = this.oldimages.dequeue();
      if (oldur) URL.revokeObjectURL(oldur);
    }

    if (
      this.refImg.current &&
      this.refImg.current.files &&
      (this.refImg.current.files?.length ?? 0) > 0
    ) {
      const file = this.refImg.current.files[0];
      const url = URL.createObjectURL(file);
      if (!permanent) this.oldimages.enqueue(url);
      return url;
    }
    return undefined;
  }
}
