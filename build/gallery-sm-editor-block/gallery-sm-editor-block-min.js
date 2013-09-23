YUI.add("gallery-sm-editor-block",function(e,t){(function(){var t=e.Editor.DOM,n=e.Base.create("editorBlock",e.Base,[],{blockCommands:{formatBlock:{fn:"_formatBlock"},heading:{fn:"_formatBlock"},justify:{property:"textAlign"},justifyCenter:{fn:"justifyCenter"},justifyLeft:{fn:"justifyLeft"},justifyRight:{fn:"justifyRight"}},blockKeyCommands:{"alt+c":{fn:"justifyCenter",allowDefault:!1,async:!1},"alt+l":{fn:"justifyLeft",allowDefault:!1,async:!1},"alt+r":{fn:"justifyRight",allowDefault:!1,async:!1},"alt+h":{fn:"_heading",allowDefault:!1,async:!1},backspace:{fn:"_delete",allowDefault:!0},"delete":{fn:"_delete",allowDefault:!0},enter:{fn:"_insertReturn",allowDefault:!1,async:!1},"shift+enter":{fn:"_insertBreak",allowDefault:!1,async:!1}},blockTags:"div, p, h1, h2, h3, h4, h5",initializer:function(){this.supportedTags?this.supportedTags+=","+this.blockTags:this.supportedTags=this.blockTags,this.keyCommands&&(this.keyCommands=e.merge(this.keyCommands,this.blockKeyCommands)),this._attachBlockEvents()},destructor:function(){this._detachBlockEvents()},justifyCenter:function(){return this.command("justify","center"),this},justifyLeft:function(){return this.command("justify","left"),this},justifyRight:function(){return this.command("justify","right"),this},_attachBlockEvents:function(){if(this._blockEvents)return;this._blockEvents=[e.Do.before(this._blockBeforeExecCommand,this,"_execCommand",this),this.on("selectionChange",this._blockOnSelectionChange,this)]},_delete:function(t,n){var r=this.selection,i=r.range(),s="backspace"===n[0]?"start":"end",o,u;this._clearCommandQueue(),i.deleteContents(),i.parentNode()===this._inputNode?(o=this._inputNode.get("childNodes").item(i.startOffset()),"end"===s&&(o=o&&o.previous()),o&&i.selectNodeContents(o).collapse({toStart:"start"===s})):o=this._getNodes(i,this.blockTags).item(0);if(this._inputNode.contains(o)){i.expand({stopAt:o}),u=i.clone().selectNodeContents(o).collapse({toStart:"start"===s});if(0===i.compare(u,{myPoint:s,otherPoint:s})){t&&t.preventDefault();var a,f,l,c;s==="start"?(a=o,f=o.previous()):(a=o.next(),f=o),a&&f&&(l=a.get("childNodes"),c=l.item(0),f.append(l),a.remove(!0),i.startNode(c,0))}i.collapse({toStart:!0})}r.select(i),e.later(0,this,this._updateSelection,{force:!0})},_detachBlockEvents:function(){this._blockEvents&&((new e.EventHandle(this._blockEvents)).detach(),this._blockEvents=null)},_execBlockCommand:function(e,t){var n=this.blockCommands[e],r=this.selection.range(),i,s;if(!r||!n)return;i=this._getNodes(r,this.blockTags);if(0===i.size())return;s=n.fn,"string"==typeof s&&(s=this[s]),s&&s.call(this,t),n.property&&i.setStyle(n.property,t)},_formatBlock:function(t){t=t.replace(/[<>]/g,"");if(-1<this.blockTags.indexOf(t)){t="<"+t+">";var n=this.selection,r=n.range(),i=[];this._getNodes(r,this.blockTags).each(function(n){var r=e.Node.create(t);r.insert(n.get("childNodes")),n.replace(r).remove(!0),i.push(r)},this),r.startNode(i[0]),r.endNode(i[i.length]),console.log("shrink in formatblock"),r.shrink().collapse({toStart:!0}),n.select(r)}},_getNodes:function(n,r){var i,s=[];n=n.clone().shrink(),i=n.startNode(),n.isCollapsed()?t.isTextNode(i)||(i=i.get("childNodes").item(n.startOffset())):i=i.get("parentNode");while(i&&i!==this._inputNode&&this._inputNode.contains(i))i.test(r)&&s.push(i),i=i.get("parentNode");return n.traverse(function(e){e.test(r)&&s.push(e)}),e.all(s)},_insertBreak:function(){var e=this.insertHTML("<br>");(!e.get("nextSibling")||""===e.get("nextSibling").get("text"))&&this.insertHTML("<br>")},_insertReturn:function(){var e=this.selection,n=e.range().shrink(),r,i,s;n.deleteContents(),r=this._getNodes(n,this.blockTags).item(0),""===r.get("text")&&n.selectNodeContents(r).collapse(),n.expand({stopAt:r}),i=n.clone().selectNodeContents(r).collapse({toStart:!0}),s=n.clone().selectNodeContents(r).collapse(),0===n.compare(i,{myPoint:"start",otherPoint:"start"})?r=r.insert(r.cloneNode(),"before").previous():0===n.compare(s,{myPoint:"end",otherPoint:"end"})?r=r.insert("<p></p>","after").next():r=this._splitRange(n,this.blockTags),t.isEmptyNode(r)&&r.setHTML("<br>"),n.selectNodeContents(r).collapse({toStart:!0}),e.select(n)},_splitRange:function(e,n){var r,i;r=e.endNode(),i=e.endOffset();while(!r.test(n))i=t.split(r,i),r=i.get("parentNode");return this._inputNode!==r&&(i=t.split(r,i),r=i.get("parentNode")),i._node||(i=r.get("childNodes").item(i)),i},_blockBeforeExecCommand:function(t,n){if(this.blockCommands[t]){var r=this._execBlockCommand(t,n);return new e.Do.Halt("Editor.Block prevented _execCommand",r)}},_blockOnSelectionChange:function(t){var n=t.range,r;if(!n.isCollapsed())return;r=n.startNode(),this._inputNode===r.ancestor(this.blockTags,!0)&&e.Editor.Base.prototype._execCommand.call(this,"formatBlock","<p>")}});e.namespace("Editor").Block=n})()},"@VERSION@",{requires:["gallery-sm-editor-base","gallery-sm-editor-dom","gallery-sm-editor-keys","node-style"]});