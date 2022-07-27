'use babel';

import IndoSlotView from './indo-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  indoSlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.indoSlotView = new IndoSlotView(state.indoSlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.indoSlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'indo-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.indoSlotView.destroy();
  },

  serialize() {
    return {
      indoSlotViewState: this.indoSlotView.serialize()
    };
  },

  toggle() {
    console.log('IndoSlot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
