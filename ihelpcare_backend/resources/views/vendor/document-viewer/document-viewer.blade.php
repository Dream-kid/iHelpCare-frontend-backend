<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document Viewer</title>

    <link rel="stylesheet" href="{{asset('vendor/document-viewer')}}/jquery_ui/themes/start/jquery-ui.min.css">
    <script src="{{asset('vendor/document-viewer')}}/jquery/jquery-1.12.4.min.js"></script>
    <script src="{{asset('vendor/document-viewer')}}/jquery_ui/jquery-ui.min.js"></script>
    <!-- ################################ For files reder ###############################-->
    <!--PDF-->
    <link rel="stylesheet" href="{{asset('vendor/document-viewer')}}/pdf/pdf.viewer.css">
    <script src="{{asset('vendor/document-viewer')}}/pdf/pdf.js"></script>
    
    <!--Docs-->
    <script src="{{asset('vendor/document-viewer')}}/docx/jszip-utils.js"></script>
    <script src="{{asset('vendor/document-viewer')}}/docx/mammoth.browser.min.js"></script>
    <!--PPTX-->
    <link rel="stylesheet" href="{{asset('vendor/document-viewer')}}/PPTXjs/css/pptxjs.css">
    <link rel="stylesheet" href="{{asset('vendor/document-viewer')}}/PPTXjs/css/nv.d3.min.css">
    <script type="text/javascript" src="{{asset('vendor/document-viewer')}}/PPTXjs/js/filereader.js"></script>
    <script type="text/javascript" src="{{asset('vendor/document-viewer')}}/PPTXjs/js/d3.min.js"></script>
    <script type="text/javascript" src="{{asset('vendor/document-viewer')}}/PPTXjs/js/nv.d3.min.js"></script>
    <script type="text/javascript" src="{{asset('vendor/document-viewer')}}/PPTXjs/js/pptxjs.js"></script>
    <script type="text/javascript" src="{{asset('vendor/document-viewer')}}/PPTXjs/js/divs2slides.js"></script>
    <!--All Spreadsheet -->
    <link rel="stylesheet" href="{{asset('vendor/document-viewer')}}/SheetJS/handsontable.full.min.css">
    <script type="text/javascript" src="{{asset('vendor/document-viewer')}}/SheetJS/handsontable.full.min.js"></script>
    <script type="text/javascript" src="{{asset('vendor/document-viewer')}}/SheetJS/xlsx.full.min.js"></script>
    <!--Image viewer-->
    {{-- <link rel="stylesheet" href="{{asset('vendor/document-viewer')}}/verySimpleImageViewer/css/jquery.verySimpleImageViewer.css">
    <script type="text/javascript" src="{{asset('vendor/document-viewer')}}/verySimpleImageViewer/js/jquery.verySimpleImageViewer.js"></script> --}}

    <!--officeToHtml-->
    <script src="{{asset('vendor/document-viewer')}}/officeToHtml/officeToHtml.js"></script>
    <link rel="stylesheet" href="{{asset('vendor/document-viewer')}}/officeToHtml/officeToHtml.css">

	{{-- Custom CSS --}}
	<link rel="stylesheet" href="{{asset('vendor/document-viewer')}}/document-view.css">
</head>
<body id="top">
	@if($fileType !== 'doc' && $fileType !== 'ppt' && $fileType !== 'xls' && $fileType !== 'pdf')
	<div id="documentLoader" class="center">Loading...</div>
	@endif

	@if($fileType === 'pdf')
	<div id="pdfDocumentLoader" class="center">Loading...</div>
	@endif

    <div class="wrapper row3">
			<main class="hoc container clear" id="container">
			<div class="content three_quarter">				

				@if($fileType !== 'txt' && $fileType !== 'docx')
					<div style="overflow: hidden;width: 100%;">
						<div id="resolte-contaniner" class="document-view-container"></div>
					</div>
				@endif

				@if($fileType === 'docx')
					<div style="overflow: hidden;width: 100%;">
						<div id="docxFilePreview">
							<div id="resolte-contaniner" class="document-view-container"></div>
						</div>
					</div>
				@endif

				@if($fileType === 'txt')
					<div style="overflow: hidden;width: 100%;">
						<div id="resolte-contaniner" class="document-view-container txt-file-preview">{{ $plainTextData }}</div>
					</div>
				@endif

				{{-- @if($fileType === 'doc' || $fileType === 'ppt' || $fileType === 'xls')
					<div style="overflow: hidden;width: 100%;">					
						<iframe id="documentView" src="https://view.officeapps.live.com/op/view.aspx?src={{$file}}" frameborder="0" style="width:100%;min-height:640px;"></iframe>
					</div>
				@endif --}}								

				{{-- @if($fileType !== 'txt' && $fileType !== 'doc' && $fileType !== 'ppt' && $fileType !== 'xls') --}}
				@if($fileType !== 'txt')
				<script>
					(function ($) {
						$(window).on('load', function () {
			
							$(".sdb_holder li").removeClass("active");
							$(this).parent().addClass("active");
							var id = $(this).attr("id");
							$("#head-name").html($(this).html());
							$("#description").hide();
							$("#resolte-contaniner").html("");
							$("#resolte-contaniner").show();
							$("#resolte-text").show();
							if (id != "demo_input") {
			
							$("#select_file").hide();
							var file_path = '{{ $file }}';
							$("#a_file").html($(this).data("file")).attr("href", file_path);
							$("#a_file").show();
							$("#file_p").show();
			
							$("#resolte-contaniner").officeToHtml({
								url: file_path,
								pdfSetting: {
										setLang: "",
										setLangFilesPath: ""
									}
								});
							} else {			
								$("#select_file").show();
								$("#file_p").show();
								$("#a_file").hide();
				
								$("#resolte-contaniner").officeToHtml({
									inputObjId: "select_file",
									pdfSetting: {
										setLang: "",
										setLangFilesPath: ""
									}
								});
							}
						});
					}(jQuery));
				</script>
				@endif

				<script>
					document.addEventListener('keydown', function() {
						if (event.keyCode == 123
							|| (event.ctrlKey && event.shiftKey && event.keyCode == 73)
							|| (event.ctrlKey && event.shiftKey && event.keyCode == 67)
							|| (event.ctrlKey && event.keyCode == 85)
							|| (event.ctrlKey && event.shiftKey && event.keyCode == 74)) {
							event.preventDefault();
							return false;
						}
					}, false);
					
					$("body").on("contextmenu", function(e) {
						return false;
					});
				</script>
			</div>
    	</main>
    </div>
</body>
</html>