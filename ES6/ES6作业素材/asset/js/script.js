(function(window,document){
	const method = {
		appendChild(parent,...children){
			children.forEach(ele => {
				parent.appendChild(ele);
			});
		},
		$(ele,root=document){
			return root.querySelector(ele);
		},
		$$(eles,root=document){
			return root.querySelectorAll(ele);
		}
	};
})(window,document)