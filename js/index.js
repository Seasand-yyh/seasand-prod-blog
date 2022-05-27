/**
 * index.js
 * @author Seasand-yyh
 * @date 2021-08-25
 */
var DOCS_BASE = './docs';
var DOCS_INDEX = 'index';
var DOCS_SUFFIX = '.md';
var SUMMARY_PATH = DOCS_BASE + '/summary.json';
var ICON_PATH = './images/icon';
var CTX_SIDEBAR_AREA = '#sidebar-area';
var CTX_MAIN_AREA = '#main-area';
var CTX_CONTEXT_AREA = '#context-area';

function init() {
  var summary = load_summary(SUMMARY_PATH);

  build_sidebar_menu(CTX_SIDEBAR_AREA, summary);
  build_main_menu(CTX_MAIN_AREA, summary);

  router();
  $(window).on('hashchange', router);
}

/**
 * load_summary
 * @param  [string] path
 * @return [array]
 */
function load_summary(path) {
  var data = [];
  if(!path)
    return data;
  $.ajax({
    'url': path,
    'async': false,
    'dataType': 'json',
    success: function(result) {
      if(typeof(result) == 'object' && result instanceof Array) {
        data = result;
      }
    },
    error: function(e) {
      alert("Opps! can't load summary data!");
      console.error('[load_summary]', e);
    }
  });
  return data;
}

/**
 * build_sidebar_menu
 * @param  [obj] ctx
 * @param  [array] datalist
 * @return [void]
 */
function build_sidebar_menu(ctx, datalist) {
  if(!datalist)
    return;
  var template = datalist.map(render_sidebar_menu_template);
  $(ctx).html(template.join(''));
}

/**
 * render_sidebar_menu_template
 * @param  [obj] data
 * @return [string]
 */
function render_sidebar_menu_template(data) {
  if(!data)
    return '';
  var id = data.id;
  var name = data.name;
  var template = '<li><a class="sea-cat-index-item" cat_index_id="'+id+'" href="javascript:void(0);" onclick="sidebar_menu_item_handler(this)">'+name+'</a></li>';
  return template;
}

/**
 * sidebar_menu_item_handler
 * @param  [obj] item
 * @return [void]
 */
function sidebar_menu_item_handler(item) {
  var id = $(item).attr('cat_index_id');
  if(!id)
    return;

  $('a.sea-cat-index-item').removeClass('active');
  $(item).addClass('active');

  var panel = $('div[cat_detail_id="'+id+'"]');
  if(!panel || panel.length == 0) {
    //$(window).scrollTop(0);
    scroll_page(0, 1000);
  } else {
    var scrollTo = panel.offset().top - 80;
    //$(window).scrollTop(scrollTo);
    scroll_page(scrollTo, 1000);
  }
}

/**
 * build_main_menu
 * @param  [obj] ctx
 * @param  [array] datalist
 * @return [void]
 */
function build_main_menu(ctx, datalist) {
  if(!datalist)
    return;
  var template = datalist.map(render_main_menu_template);
  $(ctx).html(template.join(''));
}

/**
 * render_main_menu_template
 * @param  [obj] data
 * @return [string]
 */
function render_main_menu_template(data) {
  if(!data)
    return '';

  // build child menu
  var childlist = data.childs || [];
  var child_template = childlist.map(render_main_menu_child_template);

  var id = data.id;
  var name = data.name;
  var template = '';
  template += '<div class="panel panel-default sea-cat-detail" cat_detail_id="'+id+'">';
  template += '  <div class="panel-heading">';
  template += '    <h3 class="panel-title">';
  template += '      <i class="glyphicon glyphicon-th"></i>&nbsp;'+name;
  template += '    </h3>';
  template += '  </div>';
  template += '  <div class="panel-body sea-cat-detail-wrapper">';
  template += child_template.join('');
  template += '  </div>';
  template += '</div>';
  return template;
}

/**
 * render_main_menu_child_template
 * @param  [obj] data
 * @return [string]
 */
function render_main_menu_child_template(data) {
  if(!data)
    return '';

  var id = data.id;
  var name = data.name;
  var desc = data.desc;
  var default_icon = ICON_PATH + '/default.png';
  var icon = id ? (ICON_PATH + '/' + id + '.png') : default_icon;

  var template = '';
  template += '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4" cat_item_id="'+id+'" onclick="main_menu_item_handler(this)">';
  template += '  <div class="sea-cat-detail-item">';
  template += '    <div class="sea-cat-detail-card">';
  template += '      <a class="pull-left sea-cat-detail-item-link" href="javascript:void(0);">';
  template += '        <img class="sea-cat-detail-item-img" src="'+icon+'" alt="img" onerror="this.src=\''+default_icon+'\'">';
  template += '      </a>';
  template += '      <a class="sea-cat-detail-item-link" href="javascript:void(0);" title="'+name+'">'+name+'</a>';
  template += '      <div class="help-block sea-cat-detail-item-desc" title="'+desc+'">简介：'+desc+'</div>';
  template += '    </div>';
  template += '  </div>';
  template += '</div>';
  return template;
}

/**
 * main_menu_item_handler
 * @param  [obj] item
 * @return [void]
 */
function main_menu_item_handler(item) {
  var id = $(item).attr('cat_item_id');
  if(!id)
    return;
  var path = 'docs/' + id + '/index';
  window.location.hash = path;
}

/**
 * router
 * @return [void]
 */
function router() {
  var path = location.hash.replace(/#([^#]*)(#.*)?/, './$1');
  if (!path || path == '') {
    // open category page if hash is empty
    open_category_page();
  } else {
    // otherwise, open context page and load doc
    open_context_page();
    path = path + DOCS_SUFFIX;
    load_docs(path);
  }
}

/**
 * open_category_page
 * @return [void]
 */
function open_category_page() {
  $('#ctx-page').hide();
  $('#cat-page').show();
  back_to_top();
}

/**
 * open_context_page
 * @return [void]
 */
function open_context_page() {
  $('#cat-page').hide();
  $('#ctx-page').show();
  back_to_top();
}

/**
 * back_to_top
 * @return [void]
 */
function back_to_top() {
  /*document.body.scrollIntoView({
    block: 'start',
    behavior: 'smooth'
  });*/

  scroll_page(0, 1000);
}

/**
 * scroll_page
 * @param  [number] top
 * @param  [number] time
 * @return [void]
 */
function scroll_page(top, time) {
  top = top || 0;
  time = time || 1000;
  $('html,body').animate({'scrollTop': top}, time);
}

/**
 * load_docs
 * @param  [string] path
 * @return [void]
 */
function load_docs(path) {
  if(!path)
    return;
  $.get(path, function(data) {
    if(!data)
      return;
    trans_docs(CTX_CONTEXT_AREA, data);
  }, 'text').fail(function(e) {
    alert("Opps! can't find this file to display!");
    console.error('[load_docs]', e);
  });
}

/**
 * trans_docs
 * @param  [obj] ctx
 * @param  [string] doc
 * @return [void]
 */
function trans_docs(ctx, doc) {
  if(!doc)
    return;
  // replace '' into %20 in doc
  // doc = doc.replace(/(\[.*\]\(\S+)(\s+)(\S+\))/g, '$1%20$3');

  // trans md to html
  $(ctx).html(marked(doc));

  // fix paths
  normalize_paths(ctx);

  // highlight codes
  code_highlight(ctx);

  // do some other things
  supplement(ctx);
}

/**
 * code_highlight
 * @param  [obj] ctx
 * @return [void]
 */
function code_highlight(ctx) {
  // code block highlight
  $('pre code', ctx).map(function() {
    hljs.highlightElement(this);
  });

  // code block linenumbers
  $('pre code.hljs', ctx).map(function() {
    hljs.lineNumbersBlock(this, {
      singleLine: true
    });
  });
}

/**
 * normalize_paths
 * @param  [obj] ctx
 * @return [void]
 */
function normalize_paths(ctx) {
  $('img', ctx).map(function() {
    var src = $(this).attr('src');
    if (src.slice(0, 4) === 'http' || src.slice(0, 5) === 'https') {
      return;
    }
    src = src.replace('./', '');
    var base_path = location.hash.substring(1, location.hash.lastIndexOf('/'));
    $(this).attr('src', base_path + '/' + src);
  });
}

/**
 * supplement
 * @param  [obj] ctx
 * @return [void]
 */
function supplement(ctx) {
  $('a', ctx).map(function() {
    var href = $(this).attr('href');
    if (href.slice(0, 4) === 'http' || href.slice(0, 5) === 'https') {
      $(this).attr('target', '_blank');
    }
  });
}
