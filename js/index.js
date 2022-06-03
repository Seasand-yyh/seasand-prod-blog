/**
 * index.js
 * @author Seasand-yyh
 * @date 2021-08-25
 */

var DOCS_BASE = 'docs';
var DOCS_INDEX = 'index';
var DOCS_SUFFIX = '.md';
var ICON_PATH = './images/icon';
var CATE_DATA_PATH = './data/cate.json';
var TAGS_DATA_PATH = './data/tags.json';
var DOCS_DATA_PATH = './data/docs.json';
var CATE_DATA = [];
var TAGS_DATA = [];
var DOCS_DATA = [];
var TAGS_DATA_MAP = {};
var DOCS_DATA_MAP = {};
var CUR_CATE_ID = 'all';
var CUR_TAGS_ID = 'all';

function init() {
  init_data();
  init_view();

  router();
  $(window).on('hashchange', router);
}

/**
 * init_data
 * @return [void]
 */
function init_data() {
  //load data
  CATE_DATA = load_data(CATE_DATA_PATH) || [];
  TAGS_DATA = load_data(TAGS_DATA_PATH) || [];
  DOCS_DATA = load_data(DOCS_DATA_PATH) || [];
  //fix data
  fix_docs_data();
  //format data
  format_tags_data();
  format_docs_data();
}

/**
 * load_data
 * @param  [string] path
 * @return [array]
 */
function load_data(path) {
  if(!path) {
    return;
  }
  var data = [];
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
      alert('Opps! can not load [' + path + ']!');
      console.error('[load_data]', e);
    }
  });
  return data;
}

/**
 * fix_docs_data
 * @return [void]
 */
function fix_docs_data() {
  //orderby date desc
  sort(DOCS_DATA);
  //add icon field with tag's name, if there are more than one tags, choose first.
  DOCS_DATA.forEach(function(doc) {
    var tags = doc.tags;
    doc.icon = tags[0];
  });
}

/**
 * format_tags_data
 * @return [void]
 */
function format_tags_data() {
  var map = {};
  TAGS_DATA.forEach(function(tag) {
    var key = tag.pid;
    if(!map[key]) {
      map[key] = [];
    }
    map[key].push(tag);
  });
  TAGS_DATA_MAP = map;
}

/**
 * format_docs_data
 * @return [void]
 */
function format_docs_data() {
  var map = {};
  DOCS_DATA.forEach(function(doc) {
    var tags = doc.tags;
    tags.forEach(function(tag) {
      var key = tag;
      if(!map[key]) {
        map[key] = [];
      }
      var newDoc = {};
      Object.keys(doc).forEach(function(k) {
        newDoc[k] = doc[k];
      });
      newDoc.icon = tag;
      map[key].push(newDoc);
    });
  });
  DOCS_DATA_MAP = map;
}

/**
 * init_view
 * @return [void]
 */
function init_view() {
  init_cate_view('#cate-area', CATE_DATA);
  init_tags_view('#tags-area', TAGS_DATA);
  init_docs_view('#docs-area', DOCS_DATA);
}

/**
 * init_cate_view
 * @param  [obj] ctx
 * @param  [array] datalist
 * @return [void]
 */
function init_cate_view(ctx, datalist) {
  var html = '';
  html += '<span class="text-muted">分类：</span>';
  html += '<a class="blog-filter-link active" href="javascript:void(0);" cateId="all" title="全部" onclick="cate_view_handler(this);">全部</a>';
  if(datalist && datalist.length>0) {
    var template = datalist.map(render_cate_view);
    html += template.join('');
  }
  $(ctx).html(html);
}

/**
 * render_cate_view
 * @param  [obj] data
 * @return [string]
 */
function render_cate_view(data) {
  if(!data)
    return '';
  var id = data.id;
  var name = data.name;
  var template = '<a class="blog-filter-link" href="javascript:void(0);" cateId="' + id + '" title="' + name + '" onclick="cate_view_handler(this);">' + name + '</a>';
  return template;
}

/**
 * cate_view_handler
 * @param  [obj] item
 * @return [void]
 */
function cate_view_handler(item) {
  var cateId = $(item).attr('cateId');
  CUR_CATE_ID = cateId;
  CUR_TAGS_ID = 'all';

  var tags = [];
  if(!cateId) {
    tags = [];
  } else {
    if(cateId == 'all') {
      tags = TAGS_DATA;
    } else if(TAGS_DATA_MAP[cateId]) {
      tags = TAGS_DATA_MAP[cateId];
    } else {
      tags = [];
    }
  }
  init_tags_view('#tags-area', tags);

  refresh_docs_view();

  $('#cate-area a.blog-filter-link').removeClass('active');
  $(item).addClass('active');
}

/**
 * init_tags_view
 * @param  [obj] ctx
 * @param  [array] datalist
 * @return [void]
 */
function init_tags_view(ctx, datalist) {
  var html = '';
  html += '<span class="text-muted">标签：</span>';
  html += '<a class="blog-filter-link active" href="javascript:void(0);" tagId="all" title="全部" onclick="tags_view_handler(this);">全部</a>';
  if(datalist && datalist.length>0) {
    var template = datalist.map(render_tags_view);
    html += template.join('');
  }
  $(ctx).html(html);
}

/**
 * render_tags_view
 * @param  [obj] data
 * @return [string]
 */
function render_tags_view(data) {
  if(!data)
    return '';
  var id = data.id;
  var name = data.name;
  var pid = data.pid;
  var template = '<a class="blog-filter-link" href="javascript:void(0);" tagId="' + id + '" pid="' + pid + '" title="' + name + '" onclick="tags_view_handler(this);">' + name + '</a>';
  return template;
}

/**
 * tags_view_handler
 * @param  [obj] item
 * @return [void]
 */
function tags_view_handler(item) {
  var tagId = $(item).attr('tagId');
  CUR_TAGS_ID = tagId;

  refresh_docs_view();

  $('#tags-area a.blog-filter-link').removeClass('active');
  $(item).addClass('active');
}

/**
 * init_docs_view
 * @param  [obj] ctx
 * @param  [array] datalist
 * @return [void]
 */
function init_docs_view(ctx, datalist) {
  var html = '';
  var count = 0;
  if(datalist && datalist.length>0) {
    var template = datalist.map(render_docs_view);
    html += template.join('');
    count = datalist.length;
  }
  $(ctx).html(html);
  $('#docs-count').text('(' + count + ')');
}

/**
 * render_docs_view
 * @param  [obj] data
 * @return [string]
 */
function render_docs_view(data) {
  if(!data)
    return '';
  var date = data.date;
  var title = data.title;
  var addr = data.addr || '';
  var tags = data.tags.map(function(tagId) {
    var tagsData = TAGS_DATA.filter(function(tag) {
      return tag.id == tagId;
    });
    return tagsData[0];
  }).map(function(tag) {
    return tag.name;
  }).join('、');
  var icon = data.icon;
  var default_icon_path = ICON_PATH + '/default.png';
  var icon_path = icon ? (ICON_PATH + '/' + icon + '.png') : default_icon_path;

  var template = '';
  template += '<div class="blog-article-item" date="' + date + '" title="' + title + '" addr="' + addr + '" onclick="docs_view_handler(this);">';
  template += '  <a class="blog-article-link blog-article-icon pull-left" href="javascript:void(0);">';
  template += '    <img src="' + icon_path + '" alt="img" onerror="this.src=\'' + default_icon_path + '\'">';
  template += '  </a>';
  template += '  <a class="blog-article-link blog-article-title" href="javascript:void(0);" title="' +title+ '">' + title+ '</a>';
  template += '  <div class="help-block blog-article-desc">';
  template += '    <span>标签：' + tags + '</span>';
  template += '    <span class="pull-right">' + date + '</span>';
  template += '  </div>';
  template += '</div>';
  return template;
}

/**
 * docs_view_handler
 * @param [obj] item
 * @return [void]
 */
function docs_view_handler(item) {
  var date = $(item).attr('date');
  var title = $(item).attr('title');
  var addr = $(item).attr('addr');
  if(addr) {
    window.open(addr);
  } else {
    var filename = date + ' ' + title;
    var path = DOCS_BASE + '/' + filename + '/' + DOCS_INDEX;
    window.location.hash = path;
  }
}

/**
 * search
 * @return [void]
 */
function search() {
  if(!$('#idx-page').is(':visible')) {
    return;
  }
  refresh_docs_view();
}

/**
 * refresh_docs_view
 * @return [void]
 */
function refresh_docs_view() {
  var tags = get_current_tags(CUR_TAGS_ID, CUR_CATE_ID);
  var keywords = get_keywords();
  var docs = filter(DOCS_DATA_MAP, tags, keywords);
  sort(docs);
  init_docs_view('#docs-area', docs);
}

/**
 * get_current_tags
 * @param [string] tagId
 * @param [string] cateId
 * @return [array]
 */
function get_current_tags(tagId, cateId) {
  var tags = [];
  if(!tagId) { //当前未选中任何tag, 或者选中的tag的id缺失
    tags = [];
  } else { //已选中的tag, 分为两种情况：全部 或者 某个具体的tag
    if(tagId == 'all') { //tag为全部, 还要看上一级cate具体选择了什么
      if(!cateId) { //未选中cate或者cate的id缺失
        tags = [];
      } else { //已选中的cate, 分为两种情况：全部 或者 某个具体的cate
        if(cateId == 'all') { //cate为全部, 则返回全部tag
          tags = TAGS_DATA;
        } else if(TAGS_DATA_MAP[cateId]) { //cateId对应的tag数据存在, 才返回该tag数据
          tags = TAGS_DATA_MAP[cateId];
        } else { //cateId对应的tag数据不存在, 返回空
          tags = [];
        }
      }
    } else { //根据tag的id获取该具体的tag
      tags = TAGS_DATA.filter(function(tag) {
        return tag.id == tagId;
      });
    }
  }
  return tags;
}

/**
 * get_keywords
 * @return [array]
 */
function get_keywords() {
  var keywords = [];
  $('input[name="keywords"]').each(function(index, input) {
    var text = $(input).val();
    if(!text) {
      return;
    }
    keywords = Array.prototype.concat(keywords, text.split(/\s+/));
  });
  keywords = keywords.slice(0, 5); //只取前5个有效的keyword
  return keywords;
}

/**
 * filter
 * @param [map] docsMap
 * @param [array] tags
 * @param [array] keywords
 * @return [array]
 */
function filter(docsMap, tags, keywords) {
  var docs = filter_by_tags(docsMap, tags);
  docs = remove_duplicate(docs);
  docs = filter_by_keywords(docs, keywords);
  docs = remove_duplicate(docs);
  return docs;
}

/**
 * filter_by_tags
 * @param [map] docsMap
 * @param [array] tags
 * @return [array]
 */
function filter_by_tags(docsMap, tags) {
  var docs = [];
  if(!tags) {
    return docs;
  }
  tags.map(function(tag) {
    return tag.id;
  }).forEach(function(tagId) {
    docs = Array.prototype.concat(docs, docsMap[tagId] || []);
  });
  return docs;
}

/**
 * filter_by_keywords
 * @param [array] docs
 * @param [array] keywords
 * @return [array]
 */
function filter_by_keywords(docs, keywords) {
  if(!keywords || keywords.length<=0) {
    return docs;
  }
  var result = [];
  docs.forEach(function(doc) {
    var title = doc.title;
    keywords.forEach(function(keyword) {
      if(is_match_keyword(title, keyword)) {
        result.push(doc);
      }
    });
  });
  return result;
}

/**
 * is_match_keyword
 * @param [string] text
 * @param [string] keyword
 * @return [boolean]
 */
function is_match_keyword(text, keyword) {
  if(!text || !keyword) {
    return false;
  }
  text = text.toLowerCase();
  keyword = keyword.toLowerCase();
  return text.indexOf(keyword) >= 0;
}

/**
 * remove_duplicate
 * @param [array] docs
 * @return [array]
 */
function remove_duplicate(docs) {
  if(!docs) {
    return [];
  }
  var map = {};
  docs.forEach(function(doc) {
    var date = doc.date;
    var title = doc.title;
    var key = date + '' + title;
    map[key] = doc;
  });
  return Object.keys(map).map(function(key) {
    return map[key];
  });
}

/**
 * sort
 * @param [array] docs
 * @return [void]
 */
function sort(docs) {
  if(!(docs instanceof Array)) {
    return;
  }
  docs.sort(function(a, b) {
    var val = Date.parse(b.date) - Date.parse(a.date);
    if(val == 0) {
      return a.title == b.title ? 0 : (a.title > b.title ? 1 : -1);
    }
    return val;
  });
}

/**
 * router
 * @return [void]
 */
function router() {
  var path = location.hash.replace(/#([^#]*)(#.*)?/, './$1');
  if (!path || path == '') {
    //open index page if hash is empty
    open_index_page();
  } else {
    //otherwise, open context page and load doc
    open_context_page();
    path = path + DOCS_SUFFIX;
    load_docs(path);
  }
}

/**
 * load_docs
 * @param  [string] path
 * @return [void]
 */
function load_docs(path) {
  if(!path)
    return;
  var doc = '<div class="blog-context-empty"> Can\'t find this article! </div>';
  $.ajax({
    'url': path,
    'async': false,
    'dataType': 'text',
    success: function(result) {
      if(result) {
        doc = result;
      }
    },
    error: function(e) {
      //alert('Opps! can not find this file[' + path + '] to display!');
      console.error('[load_docs]', e);
    }
  });
  $('#ctx-area').html('');
  trans_docs('#ctx-area', doc);
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

/**
 * open_index_page
 * @return [void]
 */
function open_index_page() {
  $('#ctx-page').hide();
  $('#idx-page').show();
  $('#btn-return-idx').hide();
  back_to_top();
}

/**
 * open_context_page
 * @return [void]
 */
function open_context_page() {
  $('#idx-page').hide();
  $('#ctx-page').show();
  $('#btn-return-idx').show();
  back_to_top();
}

/**
 * return_index
 * @return [void]
 */
function return_index() {
  //window.location.hash = '';
  window.history.back();
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

/** the end */
