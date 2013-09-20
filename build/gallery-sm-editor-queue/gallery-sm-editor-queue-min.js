YUI.add("gallery-sm-editor-queue",function(e,t){(function(){var t="<span></span>",n=e.Base.create("editorStyle",e.Base,[],{queueKeyCommands:{down:{fn:"_clearCommandQueue",allowDefault:!0},end:{fn:"_clearCommandQueue",allowDefault:!0},esc:{fn:"_clearCommandQueue",allowDefault:!0},home:{fn:"_clearCommandQueue",allowDefault:!0},left:{fn:"_clearCommandQueue",allowDefault:!0},pgdown:{fn:"_clearCommandQueue",allowDefault:!0},pgup:{fn:"_clearCommandQueue",allowDefault:!0},right:{fn:"_clearCommandQueue",allowDefault:!0},tab:{fn:"_clearCommandQueue",allowDefault:!0},up:{fn:"_clearCommandQueue",allowDefault:!0}},initializer:function(){this.keyCommands&&(this.keyCommands=e.merge(this.keyCommands,this.queueKeyCommands)),this._attachQueueEvents()},destructor:function(){this._detachQueueEvents()},_attachQueueEvents:function(){if(this._queueEvents)return;var t=this.get("container");this._queueEvents=[t.delegate("keypress",this._onKeyPress,this.selectors.input,this),e.Do.before(this._queueBeforeExecStyleCommand,this,"_execStyleCommand",this),e.Do.before(this._queueBeforeQueryCommandValue,this,"_queryCommandValue",this)]},_clearCommandQueue:function(){this._commandQueue=null},_detachQueueEvents:function(){this._queueEvents&&((new e.EventHandle(this._queueEvents)).detach(),this._queueEvents=null)},_flushCommandQueue:function(){if(!this._commandQueue)return;e.Object.each(this._commandQueue,function(e,t){delete this._commandQueue[t],this.command(t,e)},this),this._clearCommandQueue()},_queueCommand:function(t,n){this._commandQueue||(this._commandQueue={},e.Object.each(this.styles(),function(e,t){this.boolCommands[t]&&(e=e?this.styleCommands[t].value:""),this._commandQueue[t]=e},this)),this.boolCommands[t]&&"toggle"===n&&(n=this._commandQueue[t]?"":this.styleCommands[t].value),this._commandQueue[t]=n},_onKeyPress:function(n){var r=this.selection.range(),i;r.shrink().isCollapsed()&&this._commandQueue?(n.preventDefault(),i=r.insertNode(e.Node.create(t)),i.set("text",String.fromCharCode(n.charCode)),r.selectNode(i),this.selection.select(r),this._flushCommandQueue(),r=this.selection.range().shrink().collapse(),this.selection.select(r)):this._clearCommandQueue()},_queueBeforeExecStyleCommand:function(t,n){var r=this.selection.range();if(r&&r.isCollapsed())return this._queueCommand(t,n),new e.Do.Halt("Editor.queue prevented _execStyleCommand")},_queueBeforeQueryCommandValue:function(t){var n=this._commandQueue&&this._commandQueue[t];if(e.Lang.isValue(n))return this.boolCommands[t]&&(n=n===this.styleCommands[t].value),new e.Do.Halt("Editor.Queue prevented _queryCommandValue",n)}});e.namespace("Editor").Queue=n})()},"@VERSION@",{requires:["gallery-sm-editor-base","gallery-sm-editor-keys"]});
