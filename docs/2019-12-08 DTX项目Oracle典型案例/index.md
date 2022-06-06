# DTX项目Oracle典型案例

---

### 项目成果查询

~~~sql
--招标立项
SELECT 
    a.NAME AS record_name, 
    b.audit_code AS contract_code, 
    b.NAME AS contract_name, 
    a.create_date AS create_date, 
    a.creator AS creator, 
    '/inviteTender/edit?id='||a.id AS address 
FROM iten_invite_tender a LEFT JOIN contr_contract_info b ON a.ID = b.tender_invite_id 

--变更立项
SELECT 
    a.NAME AS record_name, 
    b.audit_code AS contract_code, 
    b.NAME AS contract_name, 
    a.create_date AS create_date, 
    a.creator AS creator, 
    '/projectChange/edit?id='||a.id AS address 
FROM contr_project_change a LEFT JOIN contr_contract_info b ON a.contract_id = b.id 
~~~

### 主材供应台账

~~~sql
SELECT 
  tab.* 
FROM ( 
/*===============查询并暂存原始数据 start======================*/
WITH rawdata AS ( 
SELECT 
  phml.car_nmuber 车辆牌号, 
  bmi.NAME 材料名称, 
  bmi.specification_material 规格, 
  phml.carrying_weight 运输重量, 
  phml.check_weight 复检重量, 
  phml.check_weight - phml.carrying_weight 磅差, 
  NULL 误差率, 
  ppp.audit_code 采购计划单编号, 
  pph.audit_code 现场验收交接单编号, 
  to_char(phml.material_date, 'yyyy-mm-dd') 到货交接时间, 
  pph.receiving_unit_name 接收单位, 
  (SELECT ccu.unit_company_name FROM contr_contract_unit ccu LEFT JOIN contr_contract_info cci ON cci.id=ccu.contract_id WHERE ccu.unit_type=1 AND cci.ID=pph.supply_contract_id AND ROWNUM=1) 供应商名称, 
  (SELECT scdi.NAME FROM Sys_Conf_Dic_Item scdi LEFT JOIN Sys_Conf_Dic_Classify scdc ON scdc.id=scdi.type_id WHERE scdc.code='CONTR_PACKSTYLE' AND scdi.code=bmi.pack_style) 包装方式, 
  NULL 出厂单价, 
  NULL 运费单价, 
  NULL 材料费, 
  NULL 运费, 
  NULL 小计, 
  ppp.request_supply_date queryDate, 
  pph.sand_stone_select sandStone, 
  CASE 
     WHEN pph.sand_stone_select=0/*砂石*/ THEN 
     CASE 
        WHEN to_char(ppp.request_supply_date, 'yyyy-mm-dd')>=to_char(to_number('${year}')-1)||'-12-21' AND to_char(ppp.request_supply_date, 'yyyy-mm-dd')<='${year}-01-20' THEN '01' 
        WHEN to_char(ppp.request_supply_date, 'yyyy-mm-dd')>='${year}-01-21' AND to_char(ppp.request_supply_date, 'yyyy-mm-dd')<='${year}-02-20' THEN '02' 
        WHEN to_char(ppp.request_supply_date, 'yyyy-mm-dd')>='${year}-02-21' AND to_char(ppp.request_supply_date, 'yyyy-mm-dd')<='${year}-03-20' THEN '03' 
        WHEN to_char(ppp.request_supply_date, 'yyyy-mm-dd')>='${year}-03-21' AND to_char(ppp.request_supply_date, 'yyyy-mm-dd')<='${year}-04-20' THEN '04' 
        WHEN to_char(ppp.request_supply_date, 'yyyy-mm-dd')>='${year}-04-21' AND to_char(ppp.request_supply_date, 'yyyy-mm-dd')<='${year}-05-20' THEN '05' 
        WHEN to_char(ppp.request_supply_date, 'yyyy-mm-dd')>='${year}-05-21' AND to_char(ppp.request_supply_date, 'yyyy-mm-dd')<='${year}-06-20' THEN '06' 
        WHEN to_char(ppp.request_supply_date, 'yyyy-mm-dd')>='${year}-06-21' AND to_char(ppp.request_supply_date, 'yyyy-mm-dd')<='${year}-07-20' THEN '07' 
        WHEN to_char(ppp.request_supply_date, 'yyyy-mm-dd')>='${year}-07-21' AND to_char(ppp.request_supply_date, 'yyyy-mm-dd')<='${year}-08-20' THEN '08' 
        WHEN to_char(ppp.request_supply_date, 'yyyy-mm-dd')>='${year}-08-21' AND to_char(ppp.request_supply_date, 'yyyy-mm-dd')<='${year}-09-20' THEN '09' 
        WHEN to_char(ppp.request_supply_date, 'yyyy-mm-dd')>='${year}-09-21' AND to_char(ppp.request_supply_date, 'yyyy-mm-dd')<='${year}-10-20' THEN '10' 
        WHEN to_char(ppp.request_supply_date, 'yyyy-mm-dd')>='${year}-10-21' AND to_char(ppp.request_supply_date, 'yyyy-mm-dd')<='${year}-11-20' THEN '11' 
        WHEN to_char(ppp.request_supply_date, 'yyyy-mm-dd')>='${year}-11-21' AND to_char(ppp.request_supply_date, 'yyyy-mm-dd')<='${year}-12-20' THEN '12' 
     END 
     WHEN pph.sand_stone_select=1/*非砂石*/ THEN 
     CASE 
        WHEN to_char(ppp.request_supply_date, 'yyyy-mm-dd')>=to_char(to_number('${year}')-1)||'-12-25' AND to_char(ppp.request_supply_date, 'yyyy-mm-dd')<='${year}-01-24' THEN '01' 
        WHEN to_char(ppp.request_supply_date, 'yyyy-mm-dd')>='${year}-01-25' AND to_char(ppp.request_supply_date, 'yyyy-mm-dd')<='${year}-02-24' THEN '02' 
        WHEN to_char(ppp.request_supply_date, 'yyyy-mm-dd')>='${year}-02-25' AND to_char(ppp.request_supply_date, 'yyyy-mm-dd')<='${year}-03-24' THEN '03' 
        WHEN to_char(ppp.request_supply_date, 'yyyy-mm-dd')>='${year}-03-25' AND to_char(ppp.request_supply_date, 'yyyy-mm-dd')<='${year}-04-24' THEN '04' 
        WHEN to_char(ppp.request_supply_date, 'yyyy-mm-dd')>='${year}-04-25' AND to_char(ppp.request_supply_date, 'yyyy-mm-dd')<='${year}-05-24' THEN '05' 
        WHEN to_char(ppp.request_supply_date, 'yyyy-mm-dd')>='${year}-05-25' AND to_char(ppp.request_supply_date, 'yyyy-mm-dd')<='${year}-06-24' THEN '06' 
        WHEN to_char(ppp.request_supply_date, 'yyyy-mm-dd')>='${year}-06-25' AND to_char(ppp.request_supply_date, 'yyyy-mm-dd')<='${year}-07-24' THEN '07' 
        WHEN to_char(ppp.request_supply_date, 'yyyy-mm-dd')>='${year}-07-25' AND to_char(ppp.request_supply_date, 'yyyy-mm-dd')<='${year}-08-24' THEN '08' 
        WHEN to_char(ppp.request_supply_date, 'yyyy-mm-dd')>='${year}-08-25' AND to_char(ppp.request_supply_date, 'yyyy-mm-dd')<='${year}-09-24' THEN '09' 
        WHEN to_char(ppp.request_supply_date, 'yyyy-mm-dd')>='${year}-09-25' AND to_char(ppp.request_supply_date, 'yyyy-mm-dd')<='${year}-10-24' THEN '10' 
        WHEN to_char(ppp.request_supply_date, 'yyyy-mm-dd')>='${year}-10-25' AND to_char(ppp.request_supply_date, 'yyyy-mm-dd')<='${year}-11-24' THEN '11' 
        WHEN to_char(ppp.request_supply_date, 'yyyy-mm-dd')>='${year}-11-25' AND to_char(ppp.request_supply_date, 'yyyy-mm-dd')<='${year}-12-24' THEN '12' 
     END 
  END 月份 
  
FROM PUR_HANDOVER_MATERIAL_LIST phml 
LEFT JOIN bas_material_info bmi ON bmi.ID=phml.material_info_id 
LEFT JOIN PUR_PURCHASE_HANDOVER pph ON pph.ID=phml.purchase_handover_id 
LEFT JOIN PUR_PURCHASE_PLAN ppp ON ppp.ID=pph.purchase_plan_id 
WHERE 1=1 
AND to_char(ppp.request_supply_date, 'yyyy-mm-dd')>=( 
CASE WHEN pph.sand_stone_select=0/*砂石*/ THEN to_char(to_number('${year}')-1)||'-12-21' 
     WHEN pph.sand_stone_select=1/*非砂石*/ THEN to_char(to_number('${year}')-1)||'-12-25' 
END) 
AND to_char(ppp.request_supply_date, 'yyyy-mm-dd')<=( 
CASE WHEN pph.sand_stone_select=0/*砂石*/ THEN '${year}-12-20' 
     WHEN pph.sand_stone_select=1/*非砂石*/ THEN '${year}-12-24' 
END) 

AND 1 = ( 
case 
  when '${materialType}'='钢材' and bmi.type=0 then 1 
  when '${materialType}'='中热水泥' and bmi.NAME LIKE '%中热硅酸盐水泥%' then 1 
  when '${materialType}'='普硅水泥' and bmi.NAME LIKE '%普通硅酸盐水泥%' then 1 
  when '${materialType}'='粉煤灰(华天能)' and bmi.NAME LIKE '%华天能%' then 1 
  when '${materialType}'='粉煤灰(金石)' and bmi.NAME LIKE '%金石%' then 1 
  when '${materialType}'='砂石' and bmi.type in (3,4,5) then 1 
  else 0 
end 
) 
ORDER BY 现场验收交接单编号 asc, 到货交接时间 asc 
)
/*===============查询并暂存原始数据 end======================*/


/*1月份*/
(SELECT '1.'||ROWNUM 序号, 0 rowType, 车辆牌号, 材料名称, 规格, 运输重量, 复检重量, 磅差, 误差率, 采购计划单编号, 现场验收交接单编号, 到货交接时间, 接收单位, 供应商名称, 包装方式, 出厂单价, 运费单价, 材料费, 运费, 小计, queryDate, sandStone, 月份 FROM rawdata WHERE 月份='01') 
UNION ALL ( 
SELECT '一月份截止处' 序号, 1 rowType, NULL 车辆牌号, NULL 材料名称, NULL 规格, sum(运输重量) 运输重量, sum(复检重量) 复检重量, sum(磅差) 磅差, NULL 误差率, NULL 采购计划单编号, NULL 现场验收交接单编号, NULL 到货交接时间, NULL 接收单位, NULL 供应商名称, NULL 包装方式, NULL 出厂单价, NULL 运费单价, NULL 材料费, NULL 运费, NULL 小计, NULL queryDate, NULL sandStone, '01' 月份 
FROM rawdata WHERE 月份='01' 
)
UNION ALL 
/*2月份*/
(SELECT '2.'||ROWNUM 序号, 0 rowType, 车辆牌号, 材料名称, 规格, 运输重量, 复检重量, 磅差, 误差率, 采购计划单编号, 现场验收交接单编号, 到货交接时间, 接收单位, 供应商名称, 包装方式, 出厂单价, 运费单价, 材料费, 运费, 小计, queryDate, sandStone, 月份 FROM rawdata WHERE 月份='02') 
UNION ALL ( 
SELECT '二月份截止处' 序号, 1 rowType, NULL 车辆牌号, NULL 材料名称, NULL 规格, sum(运输重量) 运输重量, sum(复检重量) 复检重量, sum(磅差) 磅差, NULL 误差率, NULL 采购计划单编号, NULL 现场验收交接单编号, NULL 到货交接时间, NULL 接收单位, NULL 供应商名称, NULL 包装方式, NULL 出厂单价, NULL 运费单价, NULL 材料费, NULL 运费, NULL 小计, NULL queryDate, NULL sandStone, '02' 月份 
FROM rawdata WHERE 月份='02' 
)
UNION ALL 
/*3月份*/
(SELECT '3.'||ROWNUM 序号, 0 rowType, 车辆牌号, 材料名称, 规格, 运输重量, 复检重量, 磅差, 误差率, 采购计划单编号, 现场验收交接单编号, 到货交接时间, 接收单位, 供应商名称, 包装方式, 出厂单价, 运费单价, 材料费, 运费, 小计, queryDate, sandStone, 月份 FROM rawdata WHERE 月份='03') 
UNION ALL ( 
SELECT '三月份截止处' 序号, 1 rowType, NULL 车辆牌号, NULL 材料名称, NULL 规格, sum(运输重量) 运输重量, sum(复检重量) 复检重量, sum(磅差) 磅差, NULL 误差率, NULL 采购计划单编号, NULL 现场验收交接单编号, NULL 到货交接时间, NULL 接收单位, NULL 供应商名称, NULL 包装方式, NULL 出厂单价, NULL 运费单价, NULL 材料费, NULL 运费, NULL 小计, NULL queryDate, NULL sandStone, '03' 月份 
FROM rawdata WHERE 月份='03' 
)
UNION ALL 
/*4月份*/
(SELECT '4.'||ROWNUM 序号, 0 rowType, 车辆牌号, 材料名称, 规格, 运输重量, 复检重量, 磅差, 误差率, 采购计划单编号, 现场验收交接单编号, 到货交接时间, 接收单位, 供应商名称, 包装方式, 出厂单价, 运费单价, 材料费, 运费, 小计, queryDate, sandStone, 月份 FROM rawdata WHERE 月份='04') 
UNION ALL ( 
SELECT '四月份截止处' 序号, 1 rowType, NULL 车辆牌号, NULL 材料名称, NULL 规格, sum(运输重量) 运输重量, sum(复检重量) 复检重量, sum(磅差) 磅差, NULL 误差率, NULL 采购计划单编号, NULL 现场验收交接单编号, NULL 到货交接时间, NULL 接收单位, NULL 供应商名称, NULL 包装方式, NULL 出厂单价, NULL 运费单价, NULL 材料费, NULL 运费, NULL 小计, NULL queryDate, NULL sandStone, '04' 月份 
FROM rawdata WHERE 月份='04' 
)
UNION ALL 
/*5月份*/
(SELECT '5.'||ROWNUM 序号, 0 rowType, 车辆牌号, 材料名称, 规格, 运输重量, 复检重量, 磅差, 误差率, 采购计划单编号, 现场验收交接单编号, 到货交接时间, 接收单位, 供应商名称, 包装方式, 出厂单价, 运费单价, 材料费, 运费, 小计, queryDate, sandStone, 月份 FROM rawdata WHERE 月份='05') 
UNION ALL ( 
SELECT '五月份截止处' 序号, 1 rowType, NULL 车辆牌号, NULL 材料名称, NULL 规格, sum(运输重量) 运输重量, sum(复检重量) 复检重量, sum(磅差) 磅差, NULL 误差率, NULL 采购计划单编号, NULL 现场验收交接单编号, NULL 到货交接时间, NULL 接收单位, NULL 供应商名称, NULL 包装方式, NULL 出厂单价, NULL 运费单价, NULL 材料费, NULL 运费, NULL 小计, NULL queryDate, NULL sandStone, '05' 月份 
FROM rawdata WHERE 月份='05' 
)
UNION ALL 
/*6月份*/
(SELECT '6.'||ROWNUM 序号, 0 rowType, 车辆牌号, 材料名称, 规格, 运输重量, 复检重量, 磅差, 误差率, 采购计划单编号, 现场验收交接单编号, 到货交接时间, 接收单位, 供应商名称, 包装方式, 出厂单价, 运费单价, 材料费, 运费, 小计, queryDate, sandStone, 月份 FROM rawdata WHERE 月份='06') 
UNION ALL ( 
SELECT '六月份截止处' 序号, 1 rowType, NULL 车辆牌号, NULL 材料名称, NULL 规格, sum(运输重量) 运输重量, sum(复检重量) 复检重量, sum(磅差) 磅差, NULL 误差率, NULL 采购计划单编号, NULL 现场验收交接单编号, NULL 到货交接时间, NULL 接收单位, NULL 供应商名称, NULL 包装方式, NULL 出厂单价, NULL 运费单价, NULL 材料费, NULL 运费, NULL 小计, NULL queryDate, NULL sandStone, '06' 月份 
FROM rawdata WHERE 月份='06' 
)
UNION ALL 
/*7月份*/
(SELECT '7.'||ROWNUM 序号, 0 rowType, 车辆牌号, 材料名称, 规格, 运输重量, 复检重量, 磅差, 误差率, 采购计划单编号, 现场验收交接单编号, 到货交接时间, 接收单位, 供应商名称, 包装方式, 出厂单价, 运费单价, 材料费, 运费, 小计, queryDate, sandStone, 月份 FROM rawdata WHERE 月份='07') 
UNION ALL ( 
SELECT '七月份截止处' 序号, 1 rowType, NULL 车辆牌号, NULL 材料名称, NULL 规格, sum(运输重量) 运输重量, sum(复检重量) 复检重量, sum(磅差) 磅差, NULL 误差率, NULL 采购计划单编号, NULL 现场验收交接单编号, NULL 到货交接时间, NULL 接收单位, NULL 供应商名称, NULL 包装方式, NULL 出厂单价, NULL 运费单价, NULL 材料费, NULL 运费, NULL 小计, NULL queryDate, NULL sandStone, '07' 月份 
FROM rawdata WHERE 月份='07' 
)
UNION ALL 
/*8月份*/
(SELECT '8.'||ROWNUM 序号, 0 rowType, 车辆牌号, 材料名称, 规格, 运输重量, 复检重量, 磅差, 误差率, 采购计划单编号, 现场验收交接单编号, 到货交接时间, 接收单位, 供应商名称, 包装方式, 出厂单价, 运费单价, 材料费, 运费, 小计, queryDate, sandStone, 月份 FROM rawdata WHERE 月份='08') 
UNION ALL ( 
SELECT '八月份截止处' 序号, 1 rowType, NULL 车辆牌号, NULL 材料名称, NULL 规格, sum(运输重量) 运输重量, sum(复检重量) 复检重量, sum(磅差) 磅差, NULL 误差率, NULL 采购计划单编号, NULL 现场验收交接单编号, NULL 到货交接时间, NULL 接收单位, NULL 供应商名称, NULL 包装方式, NULL 出厂单价, NULL 运费单价, NULL 材料费, NULL 运费, NULL 小计, NULL queryDate, NULL sandStone, '08' 月份 
FROM rawdata WHERE 月份='08' 
)
UNION ALL 
/*9月份*/
(SELECT '9.'||ROWNUM 序号, 0 rowType, 车辆牌号, 材料名称, 规格, 运输重量, 复检重量, 磅差, 误差率, 采购计划单编号, 现场验收交接单编号, 到货交接时间, 接收单位, 供应商名称, 包装方式, 出厂单价, 运费单价, 材料费, 运费, 小计, queryDate, sandStone, 月份 FROM rawdata WHERE 月份='09') 
UNION ALL ( 
SELECT '九月份截止处' 序号, 1 rowType, NULL 车辆牌号, NULL 材料名称, NULL 规格, sum(运输重量) 运输重量, sum(复检重量) 复检重量, sum(磅差) 磅差, NULL 误差率, NULL 采购计划单编号, NULL 现场验收交接单编号, NULL 到货交接时间, NULL 接收单位, NULL 供应商名称, NULL 包装方式, NULL 出厂单价, NULL 运费单价, NULL 材料费, NULL 运费, NULL 小计, NULL queryDate, NULL sandStone, '09' 月份 
FROM rawdata WHERE 月份='09' 
)
UNION ALL 
/*10月份*/
(SELECT '10.'||ROWNUM 序号, 0 rowType, 车辆牌号, 材料名称, 规格, 运输重量, 复检重量, 磅差, 误差率, 采购计划单编号, 现场验收交接单编号, 到货交接时间, 接收单位, 供应商名称, 包装方式, 出厂单价, 运费单价, 材料费, 运费, 小计, queryDate, sandStone, 月份 FROM rawdata WHERE 月份='10') 
UNION ALL ( 
SELECT '十月份截止处' 序号, 1 rowType, NULL 车辆牌号, NULL 材料名称, NULL 规格, sum(运输重量) 运输重量, sum(复检重量) 复检重量, sum(磅差) 磅差, NULL 误差率, NULL 采购计划单编号, NULL 现场验收交接单编号, NULL 到货交接时间, NULL 接收单位, NULL 供应商名称, NULL 包装方式, NULL 出厂单价, NULL 运费单价, NULL 材料费, NULL 运费, NULL 小计, NULL queryDate, NULL sandStone, '10' 月份 
FROM rawdata WHERE 月份='10' 
)
UNION ALL 
/*11月份*/
(SELECT '11.'||ROWNUM 序号, 0 rowType, 车辆牌号, 材料名称, 规格, 运输重量, 复检重量, 磅差, 误差率, 采购计划单编号, 现场验收交接单编号, 到货交接时间, 接收单位, 供应商名称, 包装方式, 出厂单价, 运费单价, 材料费, 运费, 小计, queryDate, sandStone, 月份 FROM rawdata WHERE 月份='11') 
UNION ALL ( 
SELECT '十一月份截止处' 序号, 1 rowType, NULL 车辆牌号, NULL 材料名称, NULL 规格, sum(运输重量) 运输重量, sum(复检重量) 复检重量, sum(磅差) 磅差, NULL 误差率, NULL 采购计划单编号, NULL 现场验收交接单编号, NULL 到货交接时间, NULL 接收单位, NULL 供应商名称, NULL 包装方式, NULL 出厂单价, NULL 运费单价, NULL 材料费, NULL 运费, NULL 小计, NULL queryDate, NULL sandStone, '11' 月份 
FROM rawdata WHERE 月份='11' 
)
UNION ALL 
/*12月份*/
(SELECT '12.'||ROWNUM 序号, 0 rowType, 车辆牌号, 材料名称, 规格, 运输重量, 复检重量, 磅差, 误差率, 采购计划单编号, 现场验收交接单编号, 到货交接时间, 接收单位, 供应商名称, 包装方式, 出厂单价, 运费单价, 材料费, 运费, 小计, queryDate, sandStone, 月份 FROM rawdata WHERE 月份='12') 
UNION ALL ( 
SELECT '十二月份截止处' 序号, 1 rowType, NULL 车辆牌号, NULL 材料名称, NULL 规格, sum(运输重量) 运输重量, sum(复检重量) 复检重量, sum(磅差) 磅差, NULL 误差率, NULL 采购计划单编号, NULL 现场验收交接单编号, NULL 到货交接时间, NULL 接收单位, NULL 供应商名称, NULL 包装方式, NULL 出厂单价, NULL 运费单价, NULL 材料费, NULL 运费, NULL 小计, NULL queryDate, NULL sandStone, '12' 月份 
FROM rawdata WHERE 月份='12' 
)

) tab 
WHERE 
tab.rowType=0 
OR (tab.rowType=1 AND tab.运输重量 is not null) 
OR (tab.rowType=1 AND tab.复检重量 is not null) 
OR (tab.rowType=1 AND tab.磅差 is not null) 
~~~

### 物资调差

~~~sql
SELECT * FROM bas_supply_adjustment_form a
LEFT JOIN contr_contract_info b ON a.contract_id = b.ID
WHERE  1=1

AND EXISTS(SELECT 1 FROM BAS_ADJUSTMENT_FORM_MATERIAL bafm,BAS_MATERIAL_INFO bmi WHERE bafm.material_info_id = bmi.ID AND bmi.code LIKE '%adsf%' )
AND EXISTS(SELECT 1 FROM BAS_ADJUSTMENT_FORM_MATERIAL bafm,BAS_MATERIAL_INFO bmi WHERE bafm.material_info_id = bmi.ID AND bmi.NAME LIKE '%adsf%' )
AND EXISTS(SELECT 1 FROM BAS_ADJUSTMENT_FORM_MATERIAL bafm,BAS_MATERIAL_INFO bmi WHERE bafm.material_info_id = bmi.ID AND bmi.TYPE= '1' )
~~~

### 公告

~~~sql
db: datacenterdb
user: zjweb
pass: zj87117433

1、原始版本
select docid,docchannel,doctitle,opertime,docpuburl from wcmdocument where docchannel='6325';

2、修改1
select docid,docchannel,doctitle,opertime,docpuburl from wcmdocument where docchannel='6325' order by opertime desc;

3、修改2
select docid,docchannel,doctitle,docreltime,docpuburl from wcmdocument where docchannel='6325' and LOWER(cruser)='dtx' order by docreltime desc;

4、修改3
select docid,docchannel,doctitle,docreltime,docpuburl from(
	select docid,docchannel,doctitle,docreltime,docpuburl from wcmdocument where docchannel='6325' and LOWER(cruser)='dtx' order by docreltime desc;
) where rownum<=7


select docid,docchannel,doctitle,crtime,docpuburl from(
  select docid,docchannel,doctitle,crtime,docpuburl from wcmdocument where docchannel='6325' and LOWER(cruser)='dtx' order by crtime DESC
) where rownum<=7;


select docid,docchannel,doctitle,docfirstpubtime,docpuburl from(
  select docid,docchannel,doctitle,docfirstpubtime,docpuburl from wcmdocument where docchannel='6325' and LOWER(cruser)='dtx' order by docfirstpubtime DESC
) where rownum<=7;

5、修改5（加分页）
select docid,docchannel,doctitle,crtime,docpuburl from(
  select ROWNUM AS rn,docid,docchannel,doctitle,crtime,docpuburl from wcmdocument where docchannel='6325' and LOWER(cruser)='dtx' order by crtime DESC
) where rn>=3 and rn<=4;

6、修改6
select * from
(select a.*,rownum row_num from
        (SELECT docid,docchannel,doctitle,crtime,docpuburl from wcmdocument where docchannel='6325' and LOWER(cruser)='dtx' order by crtime DESC) a
) b
where b.row_num between 11 and 15;

7、修改7
select * from
(select a.*,rownum row_num from
        (SELECT docid,docchannel,doctitle,crtime,docpuburl from wcmdocument where docchannel='6325' and LOWER(cruser)='dtx' and docstatus=10 and docpuburl IS NOT NULL order by crtime DESC) a
) b
where b.row_num between 11 and 15;

8、改成获取焦点新闻(docchannel='6319')
select * from
(select a.*,rownum row_num from
        (SELECT docid,docchannel,doctitle,crtime,docpuburl from wcmdocument where docchannel='6319' and LOWER(cruser)='dtx' and docstatus=10 and docpuburl IS NOT NULL order by crtime DESC) a
) b
where b.row_num between 11 and 15;



--首页公告更多：
--http://www.datengxia.com.cn/xwzx/tzgg/
~~~

### 工程实时播报

~~~sql
SELECT 
  to_char(becjo.construct_date,'yyyy'),becjo.project_name, SUM(becjo.finish_situation)
FROM 
  (SELECT bertle.construct_date, becle.* FROM bas_engineering_construction becle 
   LEFT JOIN bas_engineer_real_time bertle ON becle.engineer_real_time_id=bertle.ID
  ) becjo 
WHERE 
  --to_char(becjo.construct_date,'yyyy')=to_char((SELECT SYSDATE FROM dual),'yyyy') /*当前年份*/
  becjo.Parent_Id IN (SELECT becnd.tree_id FROM bas_engineering_construction becnd WHERE becnd.project_name = /**/'厂坝标')
GROUP BY
  to_char(becjo.construct_date,'yyyy'),becjo.project_name    
ORDER BY
  to_char(becjo.construct_date,'yyyy') DESC
~~~

### 安全监测

~~~sql
select * from ( 
select ROW_NUMBER() over(partition by t.Building order by t.Time desc)rowNum, 
t.ID as dataId, 
t.Building as building, 
t.Time as time, 
CONVERT(varchar(100), t.Time, 23) as timeStr, 
(case 
when t.Building='XSZ' then '泄水闸坝段' 
when t.Building='CF' then '厂房' 
when t.Building='CZ' then '船闸' 
when t.Building='QJFB' then '黔江副坝' 
when t.Building='NMJFB' then '南木江副坝' 
end) as buildingStr, 
(select ISNULL(a.Value, '/') from SafetyMonitorRecord a where a.Time=t.Time and a.Building=t.Building and a.Param='DesignNum') as DesignNum, 
(select ISNULL(a.Value, '/') from SafetyMonitorRecord a where a.Time=t.Time and a.Building=t.Building and a.Param='CompleteNum') as CompleteNum, 
CONVERT(varchar(100), 100*round(CONVERT(DECIMAL, (select a.Value from SafetyMonitorRecord a where a.Time=t.Time and a.Building=t.Building and a.Param='CompleteNum'))/CONVERT(DECIMAL, (select a.Value from SafetyMonitorRecord a where a.Time=t.Time and a.Building=t.Building and a.Param='DesignNum')), 4)) as CompleteRate, 
(select ISNULL(a.Value, '/') from SafetyMonitorRecord a where a.Time=t.Time and a.Building=t.Building and a.Param='Intact') as Intact, ;
(select ISNULL(a.Value, '/') from SafetyMonitorRecord a where a.Time=t.Time and a.Building=t.Building and a.Param='SL') as SL, 
(select ISNULL(a.Value, '/') from SafetyMonitorRecord a where a.Time=t.Time and a.Building=t.Building and a.Param='NBWD') as NBWD, 
(select ISNULL(a.Value, '/') from SafetyMonitorRecord a where a.Time=t.Time and a.Building=t.Building and a.Param='CZBX') as CZBX, 
(select ISNULL(a.Value, '/') from SafetyMonitorRecord a where a.Time=t.Time and a.Building=t.Building and a.Param='LFJC') as LFJC,
(select ISNULL(a.Value, '/') from SafetyMonitorRecord a where a.Time=t.Time and a.Building=t.Building and a.Param='GJYL') as GJYL, 
(select ISNULL(a.Value, '/') from SafetyMonitorRecord a where a.Time=t.Time and a.Building=t.Building and a.Param='HNTYLYB') as HNTYLYB, 
(select ISNULL(a.Value, '/') from SafetyMonitorRecord a where a.Time=t.Time and a.Building=t.Building and a.Param='YYLMS') as YYLMS, 
(select ISNULL(a.Value, '/') from SafetyMonitorRecord a where a.Time=t.Time and a.Building=t.Building and a.Param='WPJSL') as WPJSL 
from SafetyMonitorRecord t where 1=1 
) tab 
WHERE 1=1
and rowNum=1
~~~

### 进度预警

~~~sql
SELECT 
  tab2.ID, tab2.parent_Id, tab2.u_id, tab2.node_type, tab2.outline_number, tab2.summary, tab2.percent_complete, tab2.is_critical, 
  tab2.has_predecessor_link, tab2.create_date, tab2.start_date, tab2.finish_date, tab2.baseline_start_date, tab2.baseline_finish_date, 
  tab2.show_start_date, tab2.show_finish_date, 
  tab2.NAME AS nodeWorkName, 
  tab2.activity_code AS nodeWorkCode, 
  tab2.bsd AS nodeBSD, 
  tab2.bfd AS nodeBFD, 
  tab2.ssd AS nodeSSD, 
  tab2.esd AS nodeESD, 
  ( 
    SELECT t.NAME FROM prm_gantt_node t WHERE t.parent_id IS NULL START WITH t.ID=tab2.ID CONNECT BY NOCYCLE PRIOR t.parent_id=t.ID 
  ) AS nodeProjectName,/*项目名称：当前节点的根节点（parent_id为空）的name作为项目名称，下同.*/ 
  ( 
    SELECT t.activity_code FROM prm_gantt_node t WHERE t.parent_id IS NULL START WITH t.ID=tab2.ID CONNECT BY NOCYCLE PRIOR t.parent_id=t.ID 
  ) AS nodeProjectCode 
FROM ( 
SELECT 
  tab1.*, 
  (
    SELECT pew.color FROM prm_early_warning pew WHERE 1=1 AND 
    ( 
    EXISTS (SELECT 1 FROM prm_early_warning t WHERE t.left_value IS NOT NULL AND t.right_value IS NOT NULL AND t.left_condition=1 AND t.right_condition=1 
    AND tab1.bsd>t.left_value AND tab1.bsd<t.right_value AND t.dimension=1 AND t.ID= pew.ID)
    OR 
    EXISTS (SELECT 1 FROM prm_early_warning t WHERE t.left_value IS NOT NULL AND t.right_value IS NOT NULL AND t.left_condition=2 AND t.right_condition=1 
    AND tab1.bsd>=t.left_value AND tab1.bsd<t.right_value AND t.dimension=1 AND t.ID= pew.ID)
    OR 
    EXISTS (SELECT 1 FROM prm_early_warning t WHERE t.left_value IS NOT NULL AND t.right_value IS NOT NULL AND t.left_condition=1 AND t.right_condition=2 
    AND tab1.bsd>t.left_value AND tab1.bsd<=t.right_value AND t.dimension=1 AND t.ID= pew.ID)
    OR 
    EXISTS (SELECT 1 FROM prm_early_warning t WHERE t.left_value IS NOT NULL AND t.right_value IS NOT NULL AND t.left_condition=2 AND t.right_condition=2 
    AND tab1.bsd>=t.left_value AND tab1.bsd<=t.right_value AND t.dimension=1 AND t.ID= pew.ID)

    OR 
    EXISTS (SELECT 1 FROM prm_early_warning t WHERE t.left_value IS NOT NULL AND t.right_value IS NULL AND t.left_condition=1 
    AND tab1.bsd>t.left_value AND t.dimension=1 AND t.ID= pew.ID)
    OR 
    EXISTS (SELECT 1 FROM prm_early_warning t WHERE t.left_value IS NOT NULL AND t.right_value IS NULL AND t.left_condition=2 
    AND tab1.bsd>=t.left_value AND t.dimension=1 AND t.ID= pew.ID)

    OR 
    EXISTS (SELECT 1 FROM prm_early_warning t WHERE t.left_value IS NULL AND t.right_value IS NOT NULL AND t.right_condition=1 
    AND tab1.bsd<t.right_value AND t.dimension=1 AND t.ID= pew.ID)
    OR 
    EXISTS (SELECT 1 FROM prm_early_warning t WHERE t.left_value IS NULL AND t.right_value IS NOT NULL AND t.right_condition=2 
    AND tab1.bsd<=t.right_value AND t.dimension=1 AND t.ID= pew.ID)
    ) 
  ) ssd,/*开始差值等级*/ 
  (
    SELECT pew.color FROM prm_early_warning pew WHERE 1=1 AND 
    ( 
    EXISTS (SELECT 1 FROM prm_early_warning t WHERE t.left_value IS NOT NULL AND t.right_value IS NOT NULL AND t.left_condition=1 AND t.right_condition=1 
    AND tab1.bfd>t.left_value AND tab1.bfd<t.right_value AND t.dimension=2 AND t.ID= pew.ID)
    OR 
    EXISTS (SELECT 1 FROM prm_early_warning t WHERE t.left_value IS NOT NULL AND t.right_value IS NOT NULL AND t.left_condition=2 AND t.right_condition=1 
    AND tab1.bfd>=t.left_value AND tab1.bfd<t.right_value AND t.dimension=2 AND t.ID= pew.ID)
    OR 
    EXISTS (SELECT 1 FROM prm_early_warning t WHERE t.left_value IS NOT NULL AND t.right_value IS NOT NULL AND t.left_condition=1 AND t.right_condition=2 
    AND tab1.bfd>t.left_value AND tab1.bfd<=t.right_value AND t.dimension=2 AND t.ID= pew.ID)
    OR 
    EXISTS (SELECT 1 FROM prm_early_warning t WHERE t.left_value IS NOT NULL AND t.right_value IS NOT NULL AND t.left_condition=2 AND t.right_condition=2 
    AND tab1.bfd>=t.left_value AND tab1.bfd<=t.right_value AND t.dimension=2 AND t.ID= pew.ID)

    OR 
    EXISTS (SELECT 1 FROM prm_early_warning t WHERE t.left_value IS NOT NULL AND t.right_value IS NULL AND t.left_condition=1 
    AND tab1.bfd>t.left_value AND t.dimension=2 AND t.ID= pew.ID)
    OR 
    EXISTS (SELECT 1 FROM prm_early_warning t WHERE t.left_value IS NOT NULL AND t.right_value IS NULL AND t.left_condition=2 
    AND tab1.bfd>=t.left_value AND t.dimension=2 AND t.ID= pew.ID)

    OR 
    EXISTS (SELECT 1 FROM prm_early_warning t WHERE t.left_value IS NULL AND t.right_value IS NOT NULL AND t.right_condition=1 
    AND tab1.bfd<t.right_value AND t.dimension=2 AND t.ID= pew.ID)
    OR 
    EXISTS (SELECT 1 FROM prm_early_warning t WHERE t.left_value IS NULL AND t.right_value IS NOT NULL AND t.right_condition=2 
    AND tab1.bfd<=t.right_value AND t.dimension=2 AND t.ID= pew.ID)
    ) 
  ) esd/*结束差值等级*/ 
FROM ( 
  SELECT 
    ID, parent_id, u_id, NAME, activity_code, node_type, outline_number, summary, percent_complete, is_critical, has_predecessor_link, 
    create_date, start_date, finish_date, baseline_start_date, baseline_finish_date, show_start_date, show_finish_date, 
    to_date(to_char(baseline_start_date, 'YYYY-MM-DD'), 'YYYY-MM-DD') - to_date(to_char(start_date, 'YYYY-MM-DD'), 'YYYY-MM-DD') bsd,/*开始差值*/ 
    to_date(to_char(baseline_finish_date, 'YYYY-MM-DD'), 'YYYY-MM-DD') - to_date(to_char(finish_date, 'YYYY-MM-DD'), 'YYYY-MM-DD') bfd/*结束差值*/ 
  FROM prm_gantt_node pgn 
) tab1 
) tab2 WHERE 1=1 AND (tab2.ssd=2 OR tab2.ssd=3 OR tab2.esd=2 OR tab2.esd=3)/*差值等级为黄色(2)、红色(3)的视为预警数据*/ 
ORDER BY to_number(tab2.u_id) 
~~~

### 违规公示

~~~sql
/** 备份表*/
CREATE TABLE SEC_ILLEGAL_PUBLICITY_V1212 AS 
SELECT * FROM SEC_ILLEGAL_PUBLICITY; 

/** 删除表*/
drop TABLE SEC_ILLEGAL_PUBLICITY; 

/** 创建新表*/
/*==============================================================*/
/* Table: SEC_ILLEGAL_PUBLICITY                                 */
/*==============================================================*/
create table SEC_ILLEGAL_PUBLICITY 
(
   ID                   VARCHAR2(64 CHAR)              not null,
   TICKET_ISSUING_UNIT  VARCHAR2(50 CHAR)              null,
   TICKET_ISSUING_UNIT_ID VARCHAR2(64 CHAR)              null,
   ILLEGAL_DATE         DATE                           null,
   IRREGULARITIES       VARCHAR2(2000 CHAR)            null,
   CREATOR_ID           VARCHAR2(64 CHAR)              null,
   CREATOR              VARCHAR2(50 CHAR)              null,
   CREATE_DATE          DATE                           null,
   CREATOR_DEPT_ID      VARCHAR2(64 CHAR)              null,
   CREATOR_DEPT         VARCHAR2(50 CHAR)              null,
   COMPANY_ID           VARCHAR2(64 CHAR)              null,
   COMPANY_NAME         VARCHAR2(50 CHAR)              null,
   BU_ID                VARCHAR2(64 CHAR)              null,
   BU_NAME              VARCHAR2(50 CHAR)              null,
   FLOW_DEFINE_KEY      VARCHAR2(64 CHAR)              null,
   FLOW_STATUS          VARCHAR2(32 CHAR)              null,
   FLOW_NODE            VARCHAR2(200 CHAR)             null,
   FLOW_USER            VARCHAR2(50 CHAR)              null,
   INVALID              NUMBER                         null,
   INVALIDATE_USER_ID   VARCHAR2(64 CHAR)              null,
   INVALIDATE_DATE      DATE                           null,
   FLOW_END_DATE        DATE                           null,
   MODIFY_ID            VARCHAR2(64 CHAR)              null,
   MODIFIER             VARCHAR2(50 CHAR)              null,
   MODIFY_DATE          DATE                           null,
   FLOW_HIS_ACTOR       VARCHAR2(200 CHAR)             null,
   constraint PK_SEC_ILLEGAL_PUBLICITY primary key (ID)
);

comment on table SEC_ILLEGAL_PUBLICITY is '违规公示';
comment on column SEC_ILLEGAL_PUBLICITY.ID is 'ID';
comment on column SEC_ILLEGAL_PUBLICITY.TICKET_ISSUING_UNIT is '罚单开出单位';
comment on column SEC_ILLEGAL_PUBLICITY.TICKET_ISSUING_UNIT_ID is '罚单开出单位ID';
comment on column SEC_ILLEGAL_PUBLICITY.ILLEGAL_DATE is '违规时间';
comment on column SEC_ILLEGAL_PUBLICITY.IRREGULARITIES is '违规事项';
comment on column SEC_ILLEGAL_PUBLICITY.CREATOR_ID is '创建人ID';
comment on column SEC_ILLEGAL_PUBLICITY.CREATOR is '创建人姓名';
comment on column SEC_ILLEGAL_PUBLICITY.CREATE_DATE is '创建时间';
comment on column SEC_ILLEGAL_PUBLICITY.CREATOR_DEPT_ID is '创建人部门ID';
comment on column SEC_ILLEGAL_PUBLICITY.CREATOR_DEPT is '创建人部门名称';
comment on column SEC_ILLEGAL_PUBLICITY.COMPANY_ID is '所属公司ID';
comment on column SEC_ILLEGAL_PUBLICITY.COMPANY_NAME is '所属公司名称';
comment on column SEC_ILLEGAL_PUBLICITY.BU_ID is '所属经营单元/二级部门ID';
comment on column SEC_ILLEGAL_PUBLICITY.BU_NAME is '所属经营单元/二级部门';
comment on column SEC_ILLEGAL_PUBLICITY.FLOW_DEFINE_KEY is '流程定义KEY';
comment on column SEC_ILLEGAL_PUBLICITY.FLOW_STATUS is '流程状态  -1--只保存标志  0--启动  1--执行中（审批中） 2--结束';
comment on column SEC_ILLEGAL_PUBLICITY.FLOW_NODE is '当前流程环节名称';
comment on column SEC_ILLEGAL_PUBLICITY.FLOW_USER is '当前处理人名字';
comment on column SEC_ILLEGAL_PUBLICITY.INVALID is '是否作废  0-未作废 1-已作废';
comment on column SEC_ILLEGAL_PUBLICITY.INVALIDATE_USER_ID is '作废操作人ID';
comment on column SEC_ILLEGAL_PUBLICITY.INVALIDATE_DATE is '作废时间';
comment on column SEC_ILLEGAL_PUBLICITY.FLOW_END_DATE is '流程结束时间';
comment on column SEC_ILLEGAL_PUBLICITY.MODIFY_ID is '修改人ID';
comment on column SEC_ILLEGAL_PUBLICITY.MODIFIER is '修改人名';
comment on column SEC_ILLEGAL_PUBLICITY.MODIFY_DATE is '修改时间';
comment on column SEC_ILLEGAL_PUBLICITY.FLOW_HIS_ACTOR is '流程历史处理人';

/** 创建子表*/
/*==============================================================*/
/* Table: SEC_ILLEGAL_UNIT_DET                                  */
/*==============================================================*/
create table SEC_ILLEGAL_UNIT_DET 
(
   ID                   VARCHAR2(64 CHAR)              not null,
   ILLEGAL_PUBLICITY_ID VARCHAR2(64 CHAR)              null,
   ILLEGAL_UNIT         VARCHAR2(50 CHAR)              null,
   ILLEGAL_UNIT_ID      VARCHAR2(64 CHAR)              null,
   TOTAL_PRICE          NUMBER(22,2)                   null,
   SORT                 NUMBER                         null,
   constraint PK_SEC_ILLEGAL_UNIT_DET primary key (ID)
);

comment on table SEC_ILLEGAL_UNIT_DET is '违规单位情况';
comment on column SEC_ILLEGAL_UNIT_DET.ID is 'ID';
comment on column SEC_ILLEGAL_UNIT_DET.ILLEGAL_PUBLICITY_ID is '违规公示ID';
comment on column SEC_ILLEGAL_UNIT_DET.ILLEGAL_UNIT is '违规单位';
comment on column SEC_ILLEGAL_UNIT_DET.ILLEGAL_UNIT_ID is '违规单位ID';
comment on column SEC_ILLEGAL_UNIT_DET.TOTAL_PRICE is '被罚金额';
comment on column SEC_ILLEGAL_UNIT_DET.SORT is '排序号';

/** 迁移主表数据*/
insert into SEC_ILLEGAL_PUBLICITY( 
   ID,TICKET_ISSUING_UNIT,TICKET_ISSUING_UNIT_ID,ILLEGAL_DATE,IRREGULARITIES, 
   CREATOR_ID,CREATOR,CREATE_DATE,CREATOR_DEPT_ID,CREATOR_DEPT, 
   COMPANY_ID,COMPANY_NAME,BU_ID,BU_NAME,FLOW_DEFINE_KEY, 
   FLOW_STATUS,FLOW_NODE,FLOW_USER,INVALID,INVALIDATE_USER_ID, 
   INVALIDATE_DATE,FLOW_END_DATE,MODIFY_ID,MODIFIER,MODIFY_DATE, 
   FLOW_HIS_ACTOR 
) 
select 
   ID,TICKET_ISSUING_UNIT,TICKET_ISSUING_UNIT_ID,ILLEGAL_DATE,IRREGULARITIES, 
   CREATOR_ID,CREATOR,CREATE_DATE,CREATOR_DEPT_ID,CREATOR_DEPT, 
   COMPANY_ID,COMPANY_NAME,BU_ID,BU_NAME,FLOW_DEFINE_KEY, 
   FLOW_STATUS,FLOW_NODE,FLOW_USER,INVALID,INVALIDATE_USER_ID, 
   INVALIDATE_DATE,FLOW_END_DATE,MODIFY_ID,MODIFIER,MODIFY_DATE, 
   FLOW_HIS_ACTOR 
from SEC_ILLEGAL_PUBLICITY_V1212; 

/** 迁移子表数据*/
insert into SEC_ILLEGAL_UNIT_DET( 
   ID,ILLEGAL_PUBLICITY_ID,ILLEGAL_UNIT,ILLEGAL_UNIT_ID,TOTAL_PRICE,SORT 
) 
select 
   sys_guid(), 
   sipv.ID, 
   sipv.ILLEGAL_UNIT, 
   sipv.ILLEGAL_UNIT_ID, 
   sipv.TOTAL_PRICE, 
   0 
from SEC_ILLEGAL_PUBLICITY_V1212 sipv; 
~~~

### 投资完成情况图表数据

~~~sql
SELECT  a.project_name ,
SUM( CASE WHEN( to_char(i.fill_month,'MM')='01' ) THEN   NVL(a.MONTH_FINISH_INVEST,0) ELSE 0 END  ) AS  JANUARY ,
SUM( CASE WHEN( to_char(i.fill_month,'MM')='02' ) THEN   NVL(a.MONTH_FINISH_INVEST,0) ELSE 0 END  ) AS  FEBRUARY ,
SUM( CASE WHEN( to_char(i.fill_month,'MM')='03' ) THEN   NVL(a.MONTH_FINISH_INVEST,0) ELSE 0 END  ) AS  MARCH ,
SUM( CASE WHEN( to_char(i.fill_month,'MM')='04' ) THEN   NVL(a.MONTH_FINISH_INVEST,0) ELSE 0 END  ) AS  APRIL ,

SUM( CASE WHEN( to_char(i.fill_month,'MM')='05' ) THEN   NVL(a.MONTH_FINISH_INVEST,0) ELSE 0 END  ) AS  May ,

SUM( CASE WHEN( to_char(i.fill_month,'MM')='06' ) THEN   NVL(a.MONTH_FINISH_INVEST,0) ELSE 0 END  ) AS  June ,

SUM( CASE WHEN( to_char(i.fill_month,'MM')='07' ) THEN   NVL(a.MONTH_FINISH_INVEST,0) ELSE 0 END  ) AS  July ,

SUM( CASE WHEN( to_char(i.fill_month,'MM')='08' ) THEN   NVL(a.MONTH_FINISH_INVEST,0) ELSE 0 END  ) AS  August ,

SUM( CASE WHEN( to_char(i.fill_month,'MM')='09' ) THEN   NVL(a.MONTH_FINISH_INVEST,0) ELSE 0 END  ) AS  September  ,


SUM( CASE WHEN( to_char(i.fill_month,'MM')='10' ) THEN   NVL(a.MONTH_FINISH_INVEST,0) ELSE 0 END  ) AS  October   ,


SUM( CASE WHEN( to_char(i.fill_month,'MM')='11' ) THEN   NVL(a.MONTH_FINISH_INVEST,0) ELSE 0 END  ) AS  November    ,

SUM( CASE WHEN( to_char(i.fill_month,'MM')='12' ) THEN   NVL(a.MONTH_FINISH_INVEST,0) ELSE 0 END  ) AS  December  ,
i.year,a.total_price,a.year_invest_plan, i.bu_name,a.project_code,i.remark,a.tree_level

 FROM INV_ANNUAL_PLAN_SITUATION_DET   a
 LEFT JOIN INV_ANNUAL_PLAN_SITUATION i ON a.annual_plan_situation_id = i.ID
 WHERE i.annual_invest_plan_id = (select y.id from INV_ANNUAL_INVEST_PLAN y where y.year = '${year}' )  GROUP BY  a.project_name,i.year,a.total_price,a.year_invest_plan ,i.bu_name ,i.remark,a.tree_level,a.project_code order by a.project_code
~~~

### 普通合同清单编码导入

~~~sql
/* ==================================================================================================== */

INSERT INTO CONTR_CONTRACT_LIST_CODE( 
       ID,
       PROJECT_CODE,
       CLASSIFY_ENGINEER_NAME,
       CLASSIFY_ENGINEER_CODE,
       STATISTIC_UNITS,
       COEFFICIENT,
       FORM_TYPE,
       FORM_ID,
       LIST_ID,
       REMARK,
       CREATOR_ID,
       CREATOR,
       CREATE_DATE,
       CREATOR_DEPT_ID,
       CREATOR_DEPT,
       COMPANY_ID,
       COMPANY_NAME,
       BU_ID,
       BU_NAME
)
SELECT 
   sys_guid(),
   '1',
   '',
   '',
   '',
   NULL,
   0,
   (SELECT DISTINCT cci.ID FROM contr_contract_info cci WHERE cci.audit_code=tccc.contract_code AND Rownum=1),
   sys_guid(),
   '',
   '4F41FDD086BC1FABE1F24164F9361BEE',
   '超级管理员',
   (SELECT SYSDATE FROM dual),
   'F8CA392BD54CC164FDA88B85581C70F6',
   '大藤峡公司',
   'F8CA392BD54CC164FDA88B85581C70F6',
   '大藤峡公司',
   '',
   ''   
FROM TMP_CONTRACT_CODE_COMM tccc;



/* ==================================================================================================== */

INSERT INTO CONTR_CONTRACT_EB_REL( 
       ID, 
       CONTRACT_LIST_CODE_ID, 
       ESTIMATE_PROJECT_CODE_ID, 
       BUDGET_PROJECT_CODE_ID, 
       QUANTITY 
)
SELECT 
       sys_guid(), 
       (SELECT cclc.id FROM CONTR_CONTRACT_LIST_CODE cclc LEFT JOIN contr_contract_info cci ON cci.ID=cclc.form_id WHERE cclc.form_type=0 AND cci.audit_code=tccc.contract_code  AND Rownum=1),
       nvl((SELECT iepc.ID FROM INV_ESTIMATE_PROJECT_CODE iepc WHERE iepc.project_code=tccc.estimate_project_code_new),' '),
       nvl((SELECT ibpc.ID FROM INV_BUDGET_PROJECT_CODE ibpc WHERE ibpc.project_code=tccc.budget_project_code_new),' '),
       0 
FROM TMP_CONTRACT_CODE_COMM tccc;
~~~

### 合同审批总价与进度结算统计

~~~sql
SELECT 
  ci.audit_code AS 合同编号, 
  ci.NAME AS 合同名称, 
  ci.total_price AS 合同总价, 
  sum(nvl(pp.apply_money, 0)) AS 累计金额 
FROM contr_contract_info ci LEFT JOIN contr_progress_payment pp ON ci.ID=pp.contract_id 
WHERE ci.flow_status=2 AND pp.flow_status=2 
GROUP BY ci.audit_code, ci.NAME, ci.total_price 
ORDER BY ci.audit_code 
~~~

### 工程建设类进度款合同清单与概预算关系

~~~sql
--合同分类分项清单
SELECT 
cppl.project_code 项目编号, 
cppl.project_name 项目名称, 
cppl.unit 单位, 
cppl.quantity 合同工程量, 
cppl.unit_price 合同单价元, 
cppl.total_price 合同本项合计元, 
(SELECT scdi.NAME FROM Sys_Conf_Dic_Classify scdc LEFT JOIN Sys_Conf_Dic_Item scdi ON scdc.ID=scdi.type_id WHERE scdc.code='CONTR_CHARGETYPE' AND scdi.code=cppl.bill_type) 合同计费类型, 
cppl.last_finish_quantity 截至上期末累计完成工程量, 
cppl.last_finish_price 截至上期末累计完成金额, 
cppl.contractor_quantity 本期承包人申报工程量, 
cppl.contractor_price 本期承包人申报金额, 
cppl.supervisor_quantity 本期监理人审核工程量, 
cppl.supervisor_price 本期监理人审核金额, 
cppl.owner_quantity 本期业主审定工程量, 
cppl.owner_price 本期业主审定金额, 
cppl.finish_quantity 截至本期末累计完成工程量, 
cppl.finish_price 截至本期末累计完成金额, 
iepc.project_code 概算编码, 
iepc.project_name 概算名称, 
ibpc.project_code 预算编码, 
ibpc.project_name 预算名称 

FROM CONTR_PROCESS_PROJECT_LIST cppl 
LEFT JOIN contr_progress_payment cpp ON cpp.ID=cppl.progress_payment_id 
LEFT JOIN CONTR_PROJECT_INFO_LIST cpil ON cpil.contract_id=cpp.contract_id AND cpil.project_code=cppl.project_code 
LEFT JOIN CONTR_CONTRACT_LIST_CODE cclc ON cclc.list_id=cpil.ID AND cpil.contract_id=cclc.Form_Id AND cclc.form_type=0 
LEFT JOIN CONTR_CONTRACT_EB_REL ccer ON ccer.contract_list_code_id=cclc.ID 
LEFT JOIN inv_budget_project_code ibpc ON ibpc.ID=ccer.budget_project_code_id 
LEFT JOIN inv_estimate_project_code iepc ON iepc.ID=ccer.estimate_project_code_id 
WHERE 1=1 
AND cppl.progress_payment_id='8a8752925cbf1eb2015cbf3e78790013' 
AND cppl.owner_type=0 

ORDER BY cppl.SORT ASC 



--合同措施项目清单
SELECT 
cppl.project_code 项目编号, 
cppl.project_name 项目名称, 
(SELECT scdi.NAME FROM Sys_Conf_Dic_Classify scdc LEFT JOIN Sys_Conf_Dic_Item scdi ON scdc.ID=scdi.type_id WHERE scdc.code='CONTR_CHARGETYPE' AND scdi.code=cppl.bill_type) 计费类型, 
cppl.contract_price 合同金额元, 
cppl.last_finish_price 截至上期末累计完成金额, 
cppl.contractor_price 本期申报支付金额, 
cppl.supervisor_price 本期监理审核金额, 
cppl.owner_price 本期业主审定金额, 
cppl.finish_price 截至本期末累计完成金额, 
cppl.PAYMENT_PROPORTION 截至本期末累计完成比例, 
iepc.project_code 概算编码, 
iepc.project_name 概算名称, 
ibpc.project_code 预算编码, 
ibpc.project_name 预算名称 

FROM CONTR_PROCESS_PROJECT_LIST cppl 
LEFT JOIN contr_progress_payment cpp ON cpp.ID=cppl.progress_payment_id 
LEFT JOIN CONTR_PROJECT_INFO_LIST cpil ON cpil.contract_id=cpp.contract_id AND cpil.project_code=cppl.project_code 
LEFT JOIN CONTR_CONTRACT_LIST_CODE cclc ON cclc.list_id=cpil.ID AND cpil.contract_id=cclc.Form_Id AND cclc.form_type=0 
LEFT JOIN CONTR_CONTRACT_EB_REL ccer ON ccer.contract_list_code_id=cclc.ID 
LEFT JOIN inv_budget_project_code ibpc ON ibpc.ID=ccer.budget_project_code_id 
LEFT JOIN inv_estimate_project_code iepc ON iepc.ID=ccer.estimate_project_code_id 
WHERE 1=1 
AND cppl.progress_payment_id='8a8752925cbf1eb2015cbf3e78790013' 
AND cppl.owner_type=1 

ORDER BY cppl.SORT ASC 
~~~

### 进度款电费扣款导出

~~~sql
SELECT 
  ci.audit_code 合同编号,
  ci.NAME 合同名称,
  pp.document_number 凭证编号,
  cpod.form_code 扣款单号,
  cpod.deduct_name 扣款名称,
  to_char(cpod.settle_up_date, 'yyyy-mm') 扣款月份,
  cpod.Settle_Up_Money 扣款金额
FROM CONTR_PROGRESS_OTHER_DETAIL cpod LEFT JOIN contr_progress_payment pp ON pp.ID=cpod.progress_payment_id 
LEFT JOIN contr_contract_info ci ON ci.ID=pp.contract_id 
WHERE 1=1 
AND cpod.settle_type='0' 
AND EXISTS (
    SELECT 1 FROM contr_progress_payment cpp LEFT JOIN contr_contract_info cci ON cci.ID=cpp.contract_id 
    WHERE cpod.progress_payment_id=cpp.ID AND cci.audit_code = 'DJA2015005'
) 
ORDER BY cpod.form_code; 
~~~

### 权限数据导出

~~~sql
--角色-人员-权限. 
SELECT 
  sr.role_name 角色名称, 
  ( 
    SELECT listagg(employee_name, ',') within GROUP (order by employee_name) 
    FROM (SELECT DISTINCT su.employee_name FROM sys_user su LEFT JOIN SYS_USER_POSI sup ON sup.user_id=su.ID WHERE sup.role_id=sr.ID) 
  ) AS 人员名称, 
  (
    SELECT listagg(REPLACE(auth_name, '-剑波' ,''), ',') within GROUP (order by auth_name) 
    FROM (SELECT DISTINCT sra.auth_name FROM SYS_RES_AUTH sra LEFT JOIN SYS_ROLE_CONTROL src ON src.auth_id=sra.ID WHERE src.Role_Id=sr.ID) 
  ) AS 拥有权限 
FROM Sys_Role sr; 

--统一门户图标权限. 
SELECT 
  suag.NAME 权限组名称, 
  suag.remark 权限说明, 
  (
     SELECT listagg(thirdparty_name, ',') within GROUP (order by thirdparty_name) 
     FROM (SELECT DISTINCT st.thirdparty_name FROM sso_auth_group_data sagd LEFT JOIN sso_thirdparty st ON st.thirdparty_code=sagd.app_code WHERE sagd.auth_group_id=suag.ID) 
  ) AS 统一门户拥有菜单, 
  (
     SELECT listagg(user_name, ',') within GROUP (order BY user_name) 
     FROM (SELECT DISTINCT suar.user_name FROM sso_user_auth_relation suar WHERE suar.auth_group_id=suag.ID) 
  ) AS 人员名称 
FROM sso_user_auth_group suag; 

--数据权限. 
SELECT 
  buag.NAME 权限组名称, 
  buag.remark 权限说明, 
  (
     SELECT listagg(resources_name, ',') within GROUP (order BY resources_name) 
     FROM (SELECT DISTINCT sr.resources_name FROM BAS_AUTHORITY_GROUP_DATA bagd LEFT JOIN Sys_Resources sr ON sr.resources_code=bagd.business_code WHERE bagd.user_authority_group_id=buag.ID) 
  ) AS 数据模块, 
  (
     SELECT listagg(user_name, ',') within GROUP (order BY user_name) 
     FROM (SELECT DISTINCT bugr.user_name FROM BAS_USER_GROUP_RELATION bugr WHERE bugr.user_authority_group_id=buag.id) 
  ) AS 人员名称 
FROM BAS_USER_AUTHORITY_GROUP buag; 

--特定人员能看到特定部门创建的数据. 
SELECT DISTINCT 
  buda.user_name 人员名称, 
  (
     SELECT listagg(data_create_dept_name, ',') within GROUP (order BY data_create_dept_name)  
     FROM (SELECT DISTINCT buda1.data_create_dept_name FROM BAS_USER_DEPT_AUTHORITY buda1 WHERE buda1.user_id=buda.User_Id) 
  ) AS 数据创建部门 
FROM BAS_USER_DEPT_AUTHORITY buda 
ORDER BY buda.user_name; 
~~~

### 系统所有角色对应的模块权限

~~~sql
--系统所有角色对应的模块权限.
SELECT 
  sro.role_name AS 角色名称, 
  sra.auth_name AS 角色权限, 
  sr.resources_name AS 模块名称 
FROM SYS_ROLE sro LEFT JOIN SYS_ROLE_CONTROL src ON src.role_id=sro.ID 
LEFT JOIN SYS_RES_AUTH sra ON sra.ID=src.auth_id 
LEFT JOIN SYS_RES_AUTH_RELATION srar ON srar.AUTH_ID=sra.ID 
LEFT JOIN SYS_RESOURCES sr ON sr.ID=srar.RESOURCES_ID 
WHERE 1=1 
AND sr.category=0 
ORDER BY sro.role_name, sra.auth_name, sr.resources_name 
~~~

### 插入人脸识别权限

~~~sql
INSERT INTO SYS_RES_AUTH_RELATION(app_id, resources_id, auth_id) 
SELECT 
   应用ID, 资源ID, 权限ID 
FROM 
( 
SELECT 
   sai.ID 应用ID, sai.app_name 应用名称, res.ID 资源ID, res.resources_name 资源名称 
FROM SYS_RESOURCES res LEFT JOIN SYS_APP_INFO sai ON sai.ID=res.app_id 
WHERE sai.app_name='人脸识别' 
) t1 
LEFT JOIN 
( 
  SELECT 
     DISTINCT sra.ID 权限ID 
  FROM SYS_ROLE_CONTROL src LEFT JOIN SYS_ROLE sr ON sr.id=src.role_id 
  LEFT JOIN SYS_RES_AUTH sra ON sra.ID=src.auth_id 
  WHERE sra.ID IS NOT NULL AND sr.role_name IN(
     '安监部副主任', '安监部人员', '安监部主任', '财务部副主任', '财务部人员', '财务部主任', '档案室人员', '董事长', 
     '分管计合部领导', '服务中心人员', '服务中心主任', '副总工程师', '副总经理', '工程部副主任', '工程部人员', '工程部主任', 
     '基建办副主任', '基建办人员', '基建办主任', '计合部副主任', '计合部人员', '计合部主任', '纪检组长', '监察审计部副主任', 
     '监察审计部人员', '监察审计部主任', '监事会主席', '库区建管处副主任', '库区建管处人员', '库区建管处主任', '人力资源部副主任', '人力资源部人员', 
     '人力资源部主任', '设备部副主任', '设备部人员', '设备部主任', '水力发电厂筹建处人员', '水力发电厂筹建处主任', '移民部副主任', '移民部人员', 
     '移民部主任', '综合部副主任', '综合部人员', '综合部主任', '总工办副主任', '总工办人员', '总工办主任', '总工程师', '总会计师', '总经理' 
  ) 
) t2 
ON 1=1 
; 
~~~

~~~sql
--先删除. 
SELECT * /*delete*/ FROM SYS_RES_AUTH_RELATION srar WHERE srar.resources_id IN ( 
  SELECT 
     res.ID 资源ID 
  FROM SYS_RESOURCES res LEFT JOIN SYS_APP_INFO sai ON sai.ID=res.app_id 
  WHERE sai.app_name='人脸识别' 
); 


--创建人脸识别权限. 
INSERT INTO SYS_RES_AUTH(ID, AUTH_NAME, AUTH_CODE, CONTROL, OPERATION, CREATOR_ID, CREATE_DATE, MODIFY_ID, MODIFY_DATE, STATUS) 
VALUES( 
   sys_guid(), '人脸识别权限', 'RLSB_AUTH', '4028e2885691625b01569165db900001', '拥有人脸识别菜单权限', '4F41FDD086BC1FABE1F24164F9361BEE', 
   SYSDATE, NULL, SYSDATE, 0 
); 
SELECT sra.* FROM SYS_RES_AUTH sra WHERE sra.auth_name='人脸识别权限' AND sra.auth_code='RLSB_AUTH'; 


--给指定角色分配权限. 
INSERT INTO SYS_ROLE_CONTROL(ID, ROLE_ID, AUTH_TYPE, AUTH_ID, VALID_START_DATE, VALID_END_DATE, CREATOR_ID, CREATE_DATE, MODIFY_ID, MODIFY_DATE, STATUS) 
SELECT 
   sys_guid(), 
   sr.ID, 
   NULL, 
   (SELECT sra.ID FROM SYS_RES_AUTH sra WHERE sra.auth_name='人脸识别权限' AND sra.auth_code='RLSB_AUTH'), 
   to_date('2017-03-22', 'yyyy-mm-dd'), 
   to_date('2028-03-22', 'yyyy-mm-dd'), 
   '4F41FDD086BC1FABE1F24164F9361BEE', 
   SYSDATE, 
   '4F41FDD086BC1FABE1F24164F9361BEE', 
   SYSDATE, 
   0 
FROM SYS_ROLE sr WHERE sr.role_name IN ( 
   '超级角色', 
   '安监部副主任', '安监部人员', '安监部主任', '财务部副主任', '财务部人员', '财务部主任', '档案室人员', '董事长', 
   '分管计合部领导', '服务中心人员', '服务中心主任', '副总工程师', '副总经理', '工程部副主任', '工程部人员', '工程部主任', 
   '基建办副主任', '基建办人员', '基建办主任', '计合部副主任', '计合部人员', '计合部主任', '纪检组长', '监察审计部副主任', 
   '监察审计部人员', '监察审计部主任', '监事会主席', '库区建管处副主任', '库区建管处人员', '库区建管处主任', '人力资源部副主任', '人力资源部人员', 
   '人力资源部主任', '设备部副主任', '设备部人员', '设备部主任', '水力发电厂筹建处人员', '水力发电厂筹建处主任', '移民部副主任', '移民部人员', 
   '移民部主任', '综合部副主任', '综合部人员', '综合部主任', '总工办副主任', '总工办人员', '总工办主任', '总工程师', '总会计师', '总经理' 
); 


--给人脸识别的资源分配权限. 
INSERT INTO SYS_RES_AUTH_RELATION(app_id, resources_id, auth_id) 
SELECT 
   sai.ID, 
   res.ID, 
   (SELECT sra.ID FROM SYS_RES_AUTH sra WHERE sra.auth_name='人脸识别权限' AND sra.auth_code='RLSB_AUTH') 
FROM SYS_RESOURCES res LEFT JOIN SYS_APP_INFO sai ON sai.ID=res.app_id 
WHERE sai.app_name='人脸识别'; 
~~~

### 统计流程数目

~~~sql
/*============================================================================================*/

SELECT '首页维护' AS 一级模块, '通知公告' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM bas_announcement t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM bas_announcement t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM bas_announcement t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '首页维护' AS 一级模块, '工程形象' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '首页维护' AS 一级模块, '主体工程量' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '首页维护' AS 一级模块, '工程完成情况' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '首页维护' AS 一级模块, '帮助文件' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '首页维护' AS 一级模块, '工程资源配置' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '首页维护' AS 一级模块, '征地移民' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '首页维护' AS 一级模块, '财务总览维护' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '首页维护' AS 一级模块, '值班信息' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '首页维护' AS 一级模块, '工程实时播报' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM bas_engineer_Real_Time t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM bas_engineer_Real_Time t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM bas_engineer_Real_Time t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '首页维护' AS 一级模块, '工程投资' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual

UNION ALL 

SELECT '首页维护' AS 一级模块, '纵向围堰' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual

UNION ALL 

SELECT '首页维护' AS 一级模块, '防汛物资' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual

/*============================================================================================*/

UNION ALL

SELECT '科研管理' AS 一级模块, '科研立项' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM devm_scientific_Project t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM devm_scientific_Project t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM devm_scientific_Project t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '科研管理' AS 一级模块, '科研成果' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM devm_scientific_Check t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM devm_scientific_Check t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM devm_scientific_Check t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

/*============================================================================================*/

UNION ALL

SELECT '投资管理' AS 一级模块, '项目概算管理' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '投资管理' AS 一级模块, '业主控制预算' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '投资管理' AS 一级模块, '年度投资计划' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '投资管理' AS 一级模块, '中央投资计划' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '投资管理' AS 一级模块, '投资完成情况' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM inv_annual_Plan_Situation t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM inv_annual_Plan_Situation t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM inv_annual_Plan_Situation t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '投资管理' AS 一级模块, '年度汇总表' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

/*============================================================================================*/

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '招标立项' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_invite_Tender t WHERE t.tender_type=0 AND t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM iten_invite_Tender t WHERE t.tender_type=0 AND t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM iten_invite_Tender t WHERE t.tender_type=0 AND t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '招标计划' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_invite_Tender t WHERE t.tender_type=1 AND t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM iten_invite_Tender t WHERE t.tender_type=1 AND t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM iten_invite_Tender t WHERE t.tender_type=1 AND t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '委托招标代理' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_invite_Tender_Proxy t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM iten_invite_Tender_Proxy t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM iten_invite_Tender_Proxy t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '委托造价咨询' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_price_Consult_Unit t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM iten_price_Consult_Unit t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM iten_price_Consult_Unit t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '上传技术文件' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '商务文件编制' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '招标计划台账' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '专家咨询' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '招标文件审批' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_invite_Tender_Doc t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM iten_invite_Tender_Doc t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM iten_invite_Tender_Doc t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '招标文件发布' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_invite_Tender_Publish t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM iten_invite_Tender_Publish t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM iten_invite_Tender_Publish t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '控制价审批' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_price_Control t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM iten_price_Control t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM iten_price_Control t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '评标报告管理' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '招标文件澄清' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_tender_Doc_Update t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM iten_tender_Doc_Update t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM iten_tender_Doc_Update t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '招标结果' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_invite_Tender_Result t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM iten_invite_Tender_Result t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM iten_invite_Tender_Result t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '候选人公示' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_candidate_Publish t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM iten_candidate_Publish t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM iten_candidate_Publish t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '中标人公示' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_bid_Person_Publish t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM iten_bid_Person_Publish t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM iten_bid_Person_Publish t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '招标资料管理' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '代理单位库' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '造价单位库' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '公司评标专家库' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '招标文件咨询专家库' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '投标单位管理' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '询价管理' AS 二级模块, '询价申请' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_consult_Price_Apply t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM iten_consult_Price_Apply t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM iten_consult_Price_Apply t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '询价管理' AS 二级模块, '询价方案审批' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_consult_Plan_Approval t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM iten_consult_Plan_Approval t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM iten_consult_Plan_Approval t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '询价管理' AS 二级模块, '筛选供应商' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_choose_Consult_Supplier t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM iten_choose_Consult_Supplier t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM iten_choose_Consult_Supplier t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '询价管理' AS 二级模块, '询价结果审批' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_consult_Result_Approval t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM iten_consult_Result_Approval t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM iten_consult_Result_Approval t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '直接委托' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_entrust_Apply t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM iten_entrust_Apply t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM iten_entrust_Apply t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '招标模板' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

/*============================================================================================*/

UNION ALL

SELECT '合同管理' AS 一级模块, '合同审批' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM contr_contract_info t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM contr_contract_info t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM contr_contract_info t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '合同管理' AS 一级模块, '变更管理' AS 二级模块, '变更立项' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM contr_project_change t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM contr_project_change t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM contr_project_change t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '合同管理' AS 一级模块, '变更管理' AS 二级模块, '变更价款' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM contr_price_change t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM contr_price_change t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM contr_price_change t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '合同管理' AS 一级模块, '变更管理' AS 二级模块, '综合变更' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM contr_integrate_change t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM contr_integrate_change t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM contr_integrate_change t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '合同管理' AS 一级模块, '结算管理' AS 二级模块, '预付款' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM contr_advance_payment t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM contr_advance_payment t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM contr_advance_payment t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '合同管理' AS 一级模块, '结算管理' AS 二级模块, '进度款' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM contr_progress_Payment t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM contr_progress_Payment t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM contr_progress_Payment t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '合同管理' AS 一级模块, '结算管理' AS 二级模块, '支付申请' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM contr_contract_Payment t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM contr_contract_Payment t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM contr_contract_Payment t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '合同管理' AS 一级模块, '结算管理' AS 二级模块, '完工结算' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM contr_contract_Settle_Up t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM contr_contract_Settle_Up t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM contr_contract_Settle_Up t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '合同管理' AS 一级模块, '保函管理' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM contr_guarantee_Letter t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM contr_guarantee_Letter t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM contr_guarantee_Letter t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

/*============================================================================================*/

UNION ALL 

SELECT '采购与物资' AS 一级模块, '主材管理' AS 二级模块, '需求计划' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_purchase_Plan t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM pur_purchase_Plan t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM pur_purchase_Plan t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '主材管理' AS 二级模块, '到货交接' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_purchase_Handover t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM pur_purchase_Handover t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM pur_purchase_Handover t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '主材管理' AS 二级模块, '材料扣款' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_purchase_Pay t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM pur_purchase_Pay t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM pur_purchase_Pay t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '主材管理' AS 二级模块, '用料管理' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_material_Registration t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM pur_material_Registration t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM pur_material_Registration t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '主材管理' AS 二级模块, '材料价差' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_purchase_Price_Gap t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM pur_purchase_Price_Gap t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM pur_purchase_Price_Gap t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '主材管理' AS 二级模块, '采购结算' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_purchase_Settle_Up t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM pur_purchase_Settle_Up t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM pur_purchase_Settle_Up t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '主材管理' AS 二级模块, '运输结算' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_transport_Settle_Up t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM pur_transport_Settle_Up t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM pur_transport_Settle_Up t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '设备管理' AS 二级模块, '到货移交' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_delivery_Goods t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM pur_delivery_Goods t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM pur_delivery_Goods t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '设备管理' AS 二级模块, '开箱检验' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_box_Audit t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM pur_box_Audit t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM pur_box_Audit t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '设备管理' AS 二级模块, '设备领用' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_facility_Receive t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM pur_facility_Receive t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM pur_facility_Receive t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '设备管理' AS 二级模块, '备件领用' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_spare_Parts_Receive t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM pur_spare_Parts_Receive t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM pur_spare_Parts_Receive t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '设备管理' AS 二级模块, '备件归还' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_spare_Parts_Return t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM pur_spare_Parts_Return t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM pur_spare_Parts_Return t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '设备管理' AS 二级模块, '工具领用' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_borrow_Special_Tool t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM pur_borrow_Special_Tool t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM pur_borrow_Special_Tool t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '设备管理' AS 二级模块, '工具归还' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_return_Tool t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM pur_return_Tool t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM pur_return_Tool t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '设备管理' AS 二级模块, '设备缺陷' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '设备管理' AS 二级模块, '设备缺陷处置' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_facility_Disposal t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM pur_facility_Disposal t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM pur_facility_Disposal t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '设备管理' AS 二级模块, '保险报验' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '设备管理' AS 二级模块, '物资二维码' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '设备管理' AS 二级模块, '资产登记' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '设备管理' AS 二级模块, '设备需求计划' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_facility_Purchase_Plan t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM pur_facility_Purchase_Plan t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM pur_facility_Purchase_Plan t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '电费单' AS 二级模块, '电量计量' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_electricity_Bill t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM pur_electricity_Bill t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM pur_electricity_Bill t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '电费单' AS 二级模块, '电费汇总核扣' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_electricity_Summary t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM pur_electricity_Summary t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM pur_electricity_Summary t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

/*============================================================================================*/

UNION ALL 

SELECT '进度管理' AS 一级模块, '进度计划管理' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '进度管理' AS 一级模块, '进度信息采集' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '进度管理' AS 一级模块, '关键路径管理' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '进度管理' AS 一级模块, '进度分析' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '进度管理' AS 一级模块, '进度预警' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

/*============================================================================================*/

UNION ALL 

SELECT '施工管理' AS 一级模块, '计量报验单审批' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM CONTR_CALCULATE_BILL t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM CONTR_CALCULATE_BILL t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM CONTR_CALCULATE_BILL t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '施工管理' AS 一级模块, '计量报验单管理' AS 二级模块, '计量报验单查询' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '施工管理' AS 一级模块, '现场协同管理' AS 二级模块, '现场书面指示单' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM exec_field_Guide t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM exec_field_Guide t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM exec_field_Guide t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '施工管理' AS 一级模块, '现场协同管理' AS 二级模块, '整改通知' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM exec_sup_Rectification_Notice t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM exec_sup_Rectification_Notice t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM exec_sup_Rectification_Notice t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '施工管理' AS 一级模块, '现场协同管理' AS 二级模块, '报告单' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM exec_construction_Report t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM exec_construction_Report t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM exec_construction_Report t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '施工管理' AS 一级模块, '现场协同管理' AS 二级模块, '材料、构配件进场报验单' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM exec_materials_Part_Bill t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM exec_materials_Part_Bill t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM exec_materials_Part_Bill t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '施工管理' AS 一级模块, '现场协同管理' AS 二级模块, '批复表' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM exec_approve_Form t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM exec_approve_Form t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM exec_approve_Form t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '施工管理' AS 一级模块, '现场协同管理' AS 二级模块, '回复单' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM exec_reply_Form t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM exec_reply_Form t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM exec_reply_Form t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '施工管理' AS 一级模块, '施工成果管理' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

/*============================================================================================*/

UNION ALL 

SELECT '质量管理' AS 一级模块, '设备质量管理' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '质量管理' AS 一级模块, '质量标准管理' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '质量管理' AS 一级模块, '主材质量管理' AS 二级模块, '到货验收' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '质量管理' AS 一级模块, '主材质量管理' AS 二级模块, '抽样验收' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '质量管理' AS 一级模块, '验收管理' AS 二级模块, '合同验收' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '质量管理' AS 一级模块, '验收管理' AS 二级模块, '工程验收' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '质量管理' AS 一级模块, '施工质量管理' AS 二级模块, '混凝土施工' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '质量管理' AS 一级模块, '重大安全事件管理' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

/*============================================================================================*/

UNION ALL

SELECT '设计管理' AS 一级模块, '设计计划' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '设计管理' AS 一级模块, '设计接口（提资）' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '设计管理' AS 一级模块, '设计审查' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '设计管理' AS 一级模块, '设计成果' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '设计管理' AS 一级模块, '设计变更' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

/*============================================================================================*/

UNION ALL

SELECT 'bim应用' AS 一级模块, '构件管理' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT 'bim应用' AS 一级模块, '模型管理' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT 'bim应用' AS 一级模块, '进度管理' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT 'bim应用' AS 一级模块, '质量管理' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT 'bim应用' AS 一级模块, '5D管理' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

/*============================================================================================*/

UNION ALL

SELECT '三维应用' AS 一级模块, '三维场景' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

/*============================================================================================*/

UNION ALL

SELECT '工程文档管理' AS 一级模块, '工程项目' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '工程文档管理' AS 一级模块, '业务部门' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '工程文档管理' AS 一级模块, '业务模块' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '工程文档管理' AS 一级模块, '权限维护' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

/*============================================================================================*/

UNION ALL

SELECT '基础数据管理' AS 一级模块, '外部单位' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM bas_supplier_Info t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM bas_supplier_Info t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM bas_supplier_Info t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '基础数据管理' AS 一级模块, '标段管理' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '基础数据管理' AS 一级模块, '主材数据' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '基础数据管理' AS 一级模块, '物资调差' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '基础数据管理' AS 一级模块, '设备数据' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '基础数据管理' AS 一级模块, '供电间隔' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '基础数据管理' AS 一级模块, '登录日志' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

/*============================================================================================*/

UNION ALL

SELECT '技术咨询管理' AS 一级模块, '技术咨询申请' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM tcm_technical_Consultation t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM tcm_technical_Consultation t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM tcm_technical_Consultation t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '技术咨询管理' AS 一级模块, '专家库' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM tcm_expert_Approval_Process t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM tcm_expert_Approval_Process t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM tcm_expert_Approval_Process t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '技术咨询管理' AS 一级模块, '技术咨询结果' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM tcm_technical_Consult_Result t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM tcm_technical_Consult_Result t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM tcm_technical_Consult_Result t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

/*============================================================================================*/

UNION ALL

SELECT '安全管理' AS 一级模块, '安全任务下达' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '安全管理' AS 一级模块, '安全生产投入' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM sec_safety_Production_Inputs t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM sec_safety_Production_Inputs t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM sec_safety_Production_Inputs t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '安全管理' AS 一级模块, '安全任务反馈' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '安全管理' AS 一级模块, '安全隐患整改' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '安全管理' AS 一级模块, '安全生产费用' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM sec_safety_Production_Cost t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM sec_safety_Production_Cost t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM sec_safety_Production_Cost t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '安全管理' AS 一级模块, '隐患整改反馈' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '安全管理' AS 一级模块, '违规公示' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '安全管理' AS 一级模块, '安全资料共享' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '安全管理' AS 一级模块, '安全生产档案' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '安全管理' AS 一级模块, '安全通知管理' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '安全管理' AS 一级模块, '安全生产标准维护' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '安全管理' AS 一级模块, '安全生产信息报表' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM sec_safety_Product_Information t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM sec_safety_Product_Information t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM sec_safety_Product_Information t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

/*============================================================================================*/

UNION ALL

SELECT '审计管理' AS 一级模块, '项目成果查询' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '审计管理' AS 一级模块, '审计立项' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM aud_audit_Manage_Project t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM aud_audit_Manage_Project t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM aud_audit_Manage_Project t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL 

SELECT '审计管理' AS 一级模块, '审计任务下达' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM aud_task_Audit t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM aud_task_Audit t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM aud_task_Audit t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '审计管理' AS 一级模块, '审计问题整改' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM aud_problem_Reform t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM aud_problem_Reform t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM aud_problem_Reform t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '审计管理' AS 一级模块, '审计整改反馈' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 已结束流程, 
0 AS 正常结束流程, 
0 AS 正在执行流程 
FROM dual 

UNION ALL

SELECT '审计管理' AS 一级模块, '审计成果审批' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM aud_audit_Result t WHERE t.flow_status=2) AS 已结束流程, 
(SELECT COUNT(1) FROM aud_audit_Result t WHERE t.flow_status=2 AND t.flow_node='流程结束') AS 正常结束流程, 
(SELECT COUNT(1) FROM aud_audit_Result t WHERE t.flow_status IN(0,1)) AS 正在执行流程 
FROM dual 

/*============================================================================================*/
~~~

### 统计各模块业主和我们自己录的数据各有多少

~~~sql
/*============================================================================================*/

SELECT '首页维护' AS 一级模块, '通知公告' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM bas_announcement t  ) AS 记录总数, 
(SELECT COUNT(1) FROM bas_announcement t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM bas_announcement t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '首页维护' AS 一级模块, '工程形象' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM bas_image_Project t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM bas_image_Project t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '首页维护' AS 一级模块, '主体工程量' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM inv_main_Engineer_Quantity t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM inv_main_Engineer_Quantity t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '首页维护' AS 一级模块, '工程完成情况' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM inv_project_Finish_Situation t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM inv_project_Finish_Situation t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '首页维护' AS 一级模块, '帮助文件' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM bas_help_File t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM bas_help_File t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '首页维护' AS 一级模块, '工程资源配置' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM bas_project_Res_Configuration t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM bas_project_Res_Configuration t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '首页维护' AS 一级模块, '征地移民' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM bas_land_Exp_Resettlement t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM bas_land_Exp_Resettlement t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '首页维护' AS 一级模块, '财务总览维护' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM bas_financial_Maintenance t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM bas_financial_Maintenance t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '首页维护' AS 一级模块, '值班信息' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM bas_on_Duty_Information t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM bas_on_Duty_Information t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '首页维护' AS 一级模块, '工程实时播报' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM bas_engineer_Real_Time t  ) AS 记录总数, 
(SELECT COUNT(1) FROM bas_engineer_Real_Time t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM bas_engineer_Real_Time t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '首页维护' AS 一级模块, '工程投资' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM bas_construct_Investment t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM bas_construct_Investment t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual

UNION ALL 

SELECT '首页维护' AS 一级模块, '纵向围堰' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM bas_longitudinal_Cofferdam t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM bas_longitudinal_Cofferdam t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual

UNION ALL 

SELECT '首页维护' AS 一级模块, '防汛物资' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM bas_flood_Ctrl_Material t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM bas_flood_Ctrl_Material t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual

/*============================================================================================*/

UNION ALL

SELECT '科研管理' AS 一级模块, '科研立项' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM devm_scientific_Project t  ) AS 记录总数, 
(SELECT COUNT(1) FROM devm_scientific_Project t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM devm_scientific_Project t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '科研管理' AS 一级模块, '科研成果' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM devm_scientific_Check t  ) AS 记录总数, 
(SELECT COUNT(1) FROM devm_scientific_Check t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM devm_scientific_Check t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

/*============================================================================================*/

UNION ALL

SELECT '投资管理' AS 一级模块, '项目概算管理' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM inv_estimate_Project t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM inv_estimate_Project t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '投资管理' AS 一级模块, '业主控制预算' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM inv_budget_Project t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM inv_budget_Project t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '投资管理' AS 一级模块, '年度投资计划' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM inv_annual_Invest_Plan t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM inv_annual_Invest_Plan t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '投资管理' AS 一级模块, '中央投资计划' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM inv_center_Plan t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM inv_center_Plan t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '投资管理' AS 一级模块, '投资完成情况' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM inv_annual_Plan_Situation t  ) AS 记录总数, 
(SELECT COUNT(1) FROM inv_annual_Plan_Situation t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM inv_annual_Plan_Situation t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '投资管理' AS 一级模块, '年度汇总表' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM inv_annual_Summary t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM inv_annual_Summary t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

/*============================================================================================*/

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '招标立项' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_invite_Tender t WHERE t.tender_type=0 AND t.flow_status=2) AS 记录总数, 
(SELECT COUNT(1) FROM iten_invite_Tender t WHERE t.tender_type=0 AND t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM iten_invite_Tender t WHERE t.tender_type=0 AND t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '招标计划' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_invite_Tender t WHERE t.tender_type=1 AND t.flow_status=2) AS 记录总数, 
(SELECT COUNT(1) FROM iten_invite_Tender t WHERE t.tender_type=1 AND t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM iten_invite_Tender t WHERE t.tender_type=1 AND t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '委托招标代理' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_invite_Tender_Proxy t  ) AS 记录总数, 
(SELECT COUNT(1) FROM iten_invite_Tender_Proxy t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM iten_invite_Tender_Proxy t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '委托造价咨询' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_price_Consult_Unit t  ) AS 记录总数, 
(SELECT COUNT(1) FROM iten_price_Consult_Unit t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM iten_price_Consult_Unit t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '上传技术文件' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_technology_Doc t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM iten_technology_Doc t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '商务文件编制' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_commerce_Doc t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM iten_commerce_Doc t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '招标计划台账' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '专家咨询' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_consult_Expert t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM iten_consult_Expert t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '招标文件审批' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_invite_Tender_Doc t  ) AS 记录总数, 
(SELECT COUNT(1) FROM iten_invite_Tender_Doc t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM iten_invite_Tender_Doc t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '招标文件发布' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_invite_Tender_Publish t  ) AS 记录总数, 
(SELECT COUNT(1) FROM iten_invite_Tender_Publish t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM iten_invite_Tender_Publish t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '控制价审批' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_price_Control t  ) AS 记录总数, 
(SELECT COUNT(1) FROM iten_price_Control t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM iten_price_Control t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '评标报告管理' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_evaluation_Report t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM iten_evaluation_Report t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '招标文件澄清' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_tender_Doc_Update t  ) AS 记录总数, 
(SELECT COUNT(1) FROM iten_tender_Doc_Update t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM iten_tender_Doc_Update t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '招标结果' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_invite_Tender_Result t  ) AS 记录总数, 
(SELECT COUNT(1) FROM iten_invite_Tender_Result t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM iten_invite_Tender_Result t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '候选人公示' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_candidate_Publish t  ) AS 记录总数, 
(SELECT COUNT(1) FROM iten_candidate_Publish t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM iten_candidate_Publish t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '中标人公示' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_bid_Person_Publish t  ) AS 记录总数, 
(SELECT COUNT(1) FROM iten_bid_Person_Publish t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM iten_bid_Person_Publish t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '招标资料管理' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '代理单位库' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_agent_Unit_Library t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM iten_agent_Unit_Library t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '造价单位库' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_cost_Unit_Library t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM iten_cost_Unit_Library t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '公司评标专家库' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_com_Evaluation_Expert t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM iten_com_Evaluation_Expert t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '招标文件咨询专家库' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM ITEN_DOC_CONSULTATION_EXPERT t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM ITEN_DOC_CONSULTATION_EXPERT t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '工程招标' AS 二级模块, '投标单位管理' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM ITEN_tender_Information t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM ITEN_tender_Information t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '询价管理' AS 二级模块, '询价申请' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_consult_Price_Apply t  ) AS 记录总数, 
(SELECT COUNT(1) FROM iten_consult_Price_Apply t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM iten_consult_Price_Apply t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '询价管理' AS 二级模块, '询价方案审批' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_consult_Plan_Approval t  ) AS 记录总数, 
(SELECT COUNT(1) FROM iten_consult_Plan_Approval t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM iten_consult_Plan_Approval t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '询价管理' AS 二级模块, '筛选供应商' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_choose_Consult_Supplier t  ) AS 记录总数, 
(SELECT COUNT(1) FROM iten_choose_Consult_Supplier t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM iten_choose_Consult_Supplier t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '询价管理' AS 二级模块, '询价结果审批' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_consult_Result_Approval t  ) AS 记录总数, 
(SELECT COUNT(1) FROM iten_consult_Result_Approval t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM iten_consult_Result_Approval t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '直接委托' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM iten_entrust_Apply t  ) AS 记录总数, 
(SELECT COUNT(1) FROM iten_entrust_Apply t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM iten_entrust_Apply t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '招标管理' AS 一级模块, '招标模板' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM ITEN_invite_Tender_Model t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM ITEN_invite_Tender_Model t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

/*============================================================================================*/

UNION ALL

SELECT '合同管理' AS 一级模块, '合同审批' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM contr_contract_info t  ) AS 记录总数, 
(SELECT COUNT(1) FROM contr_contract_info t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM contr_contract_info t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '合同管理' AS 一级模块, '变更管理' AS 二级模块, '变更立项' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM contr_project_change t  ) AS 记录总数, 
(SELECT COUNT(1) FROM contr_project_change t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM contr_project_change t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '合同管理' AS 一级模块, '变更管理' AS 二级模块, '变更价款' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM contr_price_change t  ) AS 记录总数, 
(SELECT COUNT(1) FROM contr_price_change t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM contr_price_change t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '合同管理' AS 一级模块, '变更管理' AS 二级模块, '综合变更' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM contr_integrate_change t  ) AS 记录总数, 
(SELECT COUNT(1) FROM contr_integrate_change t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM contr_integrate_change t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '合同管理' AS 一级模块, '结算管理' AS 二级模块, '预付款' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM contr_advance_payment t  ) AS 记录总数, 
(SELECT COUNT(1) FROM contr_advance_payment t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM contr_advance_payment t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '合同管理' AS 一级模块, '结算管理' AS 二级模块, '进度款' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM contr_progress_Payment t  ) AS 记录总数, 
(SELECT COUNT(1) FROM contr_progress_Payment t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM contr_progress_Payment t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '合同管理' AS 一级模块, '结算管理' AS 二级模块, '支付申请' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM contr_contract_Payment t  ) AS 记录总数, 
(SELECT COUNT(1) FROM contr_contract_Payment t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM contr_contract_Payment t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '合同管理' AS 一级模块, '结算管理' AS 二级模块, '完工结算' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM contr_contract_Settle_Up t  ) AS 记录总数, 
(SELECT COUNT(1) FROM contr_contract_Settle_Up t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM contr_contract_Settle_Up t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '合同管理' AS 一级模块, '保函管理' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM contr_guarantee_Letter t  ) AS 记录总数, 
(SELECT COUNT(1) FROM contr_guarantee_Letter t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM contr_guarantee_Letter t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

/*============================================================================================*/

UNION ALL 

SELECT '采购与物资' AS 一级模块, '主材管理' AS 二级模块, '需求计划' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_purchase_Plan t  ) AS 记录总数, 
(SELECT COUNT(1) FROM pur_purchase_Plan t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM pur_purchase_Plan t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '主材管理' AS 二级模块, '到货交接' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_purchase_Handover t  ) AS 记录总数, 
(SELECT COUNT(1) FROM pur_purchase_Handover t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM pur_purchase_Handover t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '主材管理' AS 二级模块, '材料扣款' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_purchase_Pay t  ) AS 记录总数, 
(SELECT COUNT(1) FROM pur_purchase_Pay t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM pur_purchase_Pay t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '主材管理' AS 二级模块, '用料管理' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_material_Registration t  ) AS 记录总数, 
(SELECT COUNT(1) FROM pur_material_Registration t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM pur_material_Registration t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '主材管理' AS 二级模块, '材料价差' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_purchase_Price_Gap t  ) AS 记录总数, 
(SELECT COUNT(1) FROM pur_purchase_Price_Gap t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM pur_purchase_Price_Gap t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '主材管理' AS 二级模块, '采购结算' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_purchase_Settle_Up t  ) AS 记录总数, 
(SELECT COUNT(1) FROM pur_purchase_Settle_Up t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM pur_purchase_Settle_Up t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '主材管理' AS 二级模块, '运输结算' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_transport_Settle_Up t  ) AS 记录总数, 
(SELECT COUNT(1) FROM pur_transport_Settle_Up t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM pur_transport_Settle_Up t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '设备管理' AS 二级模块, '到货移交' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_delivery_Goods t  ) AS 记录总数, 
(SELECT COUNT(1) FROM pur_delivery_Goods t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM pur_delivery_Goods t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '设备管理' AS 二级模块, '开箱检验' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_box_Audit t  ) AS 记录总数, 
(SELECT COUNT(1) FROM pur_box_Audit t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM pur_box_Audit t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '设备管理' AS 二级模块, '设备领用' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_facility_Receive t  ) AS 记录总数, 
(SELECT COUNT(1) FROM pur_facility_Receive t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM pur_facility_Receive t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '设备管理' AS 二级模块, '备件领用' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_spare_Parts_Receive t  ) AS 记录总数, 
(SELECT COUNT(1) FROM pur_spare_Parts_Receive t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM pur_spare_Parts_Receive t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '设备管理' AS 二级模块, '备件归还' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_spare_Parts_Return t  ) AS 记录总数, 
(SELECT COUNT(1) FROM pur_spare_Parts_Return t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM pur_spare_Parts_Return t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '设备管理' AS 二级模块, '工具领用' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_borrow_Special_Tool t  ) AS 记录总数, 
(SELECT COUNT(1) FROM pur_borrow_Special_Tool t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM pur_borrow_Special_Tool t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '设备管理' AS 二级模块, '工具归还' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_return_Tool t  ) AS 记录总数, 
(SELECT COUNT(1) FROM pur_return_Tool t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM pur_return_Tool t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '设备管理' AS 二级模块, '设备缺陷' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_facility_Problem t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM pur_facility_Problem t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '设备管理' AS 二级模块, '设备缺陷处置' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_facility_Disposal t  ) AS 记录总数, 
(SELECT COUNT(1) FROM pur_facility_Disposal t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM pur_facility_Disposal t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '设备管理' AS 二级模块, '保险报验' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_facility_Insurance_Check t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM pur_facility_Insurance_Check t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '设备管理' AS 二级模块, '物资二维码' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_facility_Qr t  ) AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '设备管理' AS 二级模块, '资产登记' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_register_Property t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM pur_register_Property t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '设备管理' AS 二级模块, '设备需求计划' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_facility_Purchase_Plan t  ) AS 记录总数, 
(SELECT COUNT(1) FROM pur_facility_Purchase_Plan t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM pur_facility_Purchase_Plan t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '电费单' AS 二级模块, '电量计量' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_electricity_Bill t  ) AS 记录总数, 
(SELECT COUNT(1) FROM pur_electricity_Bill t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM pur_electricity_Bill t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '采购与物资' AS 一级模块, '电费单' AS 二级模块, '电费汇总核扣' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM pur_electricity_Summary t  ) AS 记录总数, 
(SELECT COUNT(1) FROM pur_electricity_Summary t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM pur_electricity_Summary t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

/*============================================================================================*/

UNION ALL 

SELECT '进度管理' AS 一级模块, '进度计划管理' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '进度管理' AS 一级模块, '进度信息采集' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '进度管理' AS 一级模块, '关键路径管理' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '进度管理' AS 一级模块, '进度分析' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '进度管理' AS 一级模块, '进度预警' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

/*============================================================================================*/

UNION ALL 

SELECT '施工管理' AS 一级模块, '计量报验单审批' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM CONTR_CALCULATE_BILL t  ) AS 记录总数, 
(SELECT COUNT(1) FROM CONTR_CALCULATE_BILL t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM CONTR_CALCULATE_BILL t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '施工管理' AS 一级模块, '计量报验单管理' AS 二级模块, '计量报验单查询' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '施工管理' AS 一级模块, '现场协同管理' AS 二级模块, '现场书面指示单' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM exec_field_Guide t  ) AS 记录总数, 
(SELECT COUNT(1) FROM exec_field_Guide t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM exec_field_Guide t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '施工管理' AS 一级模块, '现场协同管理' AS 二级模块, '整改通知' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM exec_sup_Rectification_Notice t  ) AS 记录总数, 
(SELECT COUNT(1) FROM exec_sup_Rectification_Notice t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM exec_sup_Rectification_Notice t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '施工管理' AS 一级模块, '现场协同管理' AS 二级模块, '报告单' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM exec_construction_Report t  ) AS 记录总数, 
(SELECT COUNT(1) FROM exec_construction_Report t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM exec_construction_Report t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '施工管理' AS 一级模块, '现场协同管理' AS 二级模块, '材料、构配件进场报验单' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM exec_materials_Part_Bill t  ) AS 记录总数, 
(SELECT COUNT(1) FROM exec_materials_Part_Bill t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM exec_materials_Part_Bill t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '施工管理' AS 一级模块, '现场协同管理' AS 二级模块, '批复表' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM exec_approve_Form t  ) AS 记录总数, 
(SELECT COUNT(1) FROM exec_approve_Form t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM exec_approve_Form t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '施工管理' AS 一级模块, '现场协同管理' AS 二级模块, '回复单' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM exec_reply_Form t  ) AS 记录总数, 
(SELECT COUNT(1) FROM exec_reply_Form t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM exec_reply_Form t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '施工管理' AS 一级模块, '施工成果管理' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

/*============================================================================================*/

UNION ALL 

SELECT '质量管理' AS 一级模块, '设备质量管理' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '质量管理' AS 一级模块, '质量标准管理' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '质量管理' AS 一级模块, '主材质量管理' AS 二级模块, '到货验收' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '质量管理' AS 一级模块, '主材质量管理' AS 二级模块, '抽样验收' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '质量管理' AS 一级模块, '验收管理' AS 二级模块, '合同验收' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM quc_contract_Check_Accept t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM quc_contract_Check_Accept t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '质量管理' AS 一级模块, '验收管理' AS 二级模块, '工程验收' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM quc_project_Check_Accept t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM quc_project_Check_Accept t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '质量管理' AS 一级模块, '施工质量管理' AS 二级模块, '混凝土施工' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '质量管理' AS 一级模块, '施工质量管理' AS 二级模块, '质量评定管理' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

/*============================================================================================*/

UNION ALL

SELECT '设计管理' AS 一级模块, '设计计划' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '设计管理' AS 一级模块, '设计接口（提资）' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '设计管理' AS 一级模块, '设计审查' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '设计管理' AS 一级模块, '设计成果' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '设计管理' AS 一级模块, '设计变更' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

/*============================================================================================*/

UNION ALL

SELECT 'bim应用' AS 一级模块, '构件管理' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT 'bim应用' AS 一级模块, '模型管理' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT 'bim应用' AS 一级模块, '进度管理' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT 'bim应用' AS 一级模块, '质量管理' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT 'bim应用' AS 一级模块, '5D管理' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

/*============================================================================================*/

UNION ALL

SELECT '三维应用' AS 一级模块, '三维场景' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

/*============================================================================================*/

UNION ALL

SELECT '工程文档管理' AS 一级模块, '工程项目' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '工程文档管理' AS 一级模块, '业务部门' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '工程文档管理' AS 一级模块, '业务模块' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '工程文档管理' AS 一级模块, '权限维护' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

/*============================================================================================*/

UNION ALL

SELECT '基础数据管理' AS 一级模块, '外部单位' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM bas_supplier_Info t  ) AS 记录总数, 
(SELECT COUNT(1) FROM bas_supplier_Info t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM bas_supplier_Info t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '基础数据管理' AS 一级模块, '标段管理' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM bas_small_Project t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM bas_small_Project t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '基础数据管理' AS 一级模块, '主材数据' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM bas_material_Info t where t.data_type=0 ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM bas_material_Info t WHERE t.data_type=0 and t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '基础数据管理' AS 一级模块, '物资调差' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM bas_supply_Adjustment_Form t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM bas_supply_Adjustment_Form t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '基础数据管理' AS 一级模块, '设备数据' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM bas_material_Info t where t.data_type=1 ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM bas_material_Info t WHERE t.data_type=1 and t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '基础数据管理' AS 一级模块, '供电间隔' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM bas_power_Interval t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM bas_power_Interval t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '基础数据管理' AS 一级模块, '登录日志' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM bas_log_in_log t  ) AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

/*============================================================================================*/

UNION ALL

SELECT '技术咨询管理' AS 一级模块, '技术咨询申请' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM tcm_technical_Consultation t  ) AS 记录总数, 
(SELECT COUNT(1) FROM tcm_technical_Consultation t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM tcm_technical_Consultation t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '技术咨询管理' AS 一级模块, '专家库' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM tcm_expert_Approval_Process t  ) AS 记录总数, 
(SELECT COUNT(1) FROM tcm_expert_Approval_Process t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM tcm_expert_Approval_Process t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '技术咨询管理' AS 一级模块, '技术咨询结果' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM tcm_technical_Consult_Result t  ) AS 记录总数, 
(SELECT COUNT(1) FROM tcm_technical_Consult_Result t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM tcm_technical_Consult_Result t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

/*============================================================================================*/

UNION ALL

SELECT '安全管理' AS 一级模块, '安全任务下达' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM sec_safety_Task_Release t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM sec_safety_Task_Release t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '安全管理' AS 一级模块, '安全生产投入' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM sec_safety_Production_Inputs t  ) AS 记录总数, 
(SELECT COUNT(1) FROM sec_safety_Production_Inputs t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM sec_safety_Production_Inputs t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '安全管理' AS 一级模块, '安全任务反馈' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM sec_safety_Task_Reply t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM sec_safety_Task_Reply t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '安全管理' AS 一级模块, '安全隐患整改' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM sec_rectification_Dangers t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM sec_rectification_Dangers t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '安全管理' AS 一级模块, '安全生产费用' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM sec_safety_Production_Cost t  ) AS 记录总数, 
(SELECT COUNT(1) FROM sec_safety_Production_Cost t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM sec_safety_Production_Cost t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '安全管理' AS 一级模块, '隐患整改反馈' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM sec_dangers_Reply t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM sec_dangers_Reply t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '安全管理' AS 一级模块, '违规公示' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM sec_illegal_Publicity t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM sec_illegal_Publicity t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '安全管理' AS 一级模块, '安全资料共享' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '安全管理' AS 一级模块, '安全生产档案' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '安全管理' AS 一级模块, '安全通知管理' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '安全管理' AS 一级模块, '安全生产标准维护' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM sec_work_Safety_Standard t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM sec_work_Safety_Standard t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '安全管理' AS 一级模块, '安全生产信息报表' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM sec_safety_Product_Information t  ) AS 记录总数, 
(SELECT COUNT(1) FROM sec_safety_Product_Information t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM sec_safety_Product_Information t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

/*============================================================================================*/

UNION ALL

SELECT '审计管理' AS 一级模块, '项目成果查询' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
0 AS 记录总数, 
0 AS 业主所录记录数, 
0 AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '审计管理' AS 一级模块, '审计立项' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM aud_audit_Manage_Project t  ) AS 记录总数, 
(SELECT COUNT(1) FROM aud_audit_Manage_Project t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM aud_audit_Manage_Project t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL 

SELECT '审计管理' AS 一级模块, '审计任务下达' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM aud_task_Audit t  ) AS 记录总数, 
(SELECT COUNT(1) FROM aud_task_Audit t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM aud_task_Audit t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '审计管理' AS 一级模块, '审计问题整改' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM aud_problem_Reform t  ) AS 记录总数, 
(SELECT COUNT(1) FROM aud_problem_Reform t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM aud_problem_Reform t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '审计管理' AS 一级模块, '审计整改反馈' AS 二级模块, '' AS 三级模块, '否' AS 是否有流程, 
(SELECT COUNT(1) FROM aud_problem_Reform_Reply t  ) AS 记录总数, 
0 AS 业主所录记录数, 
(SELECT COUNT(1) FROM aud_problem_Reform_Reply t WHERE t.creator LIKE '%超级管理员%' ) AS 我们所录记录数 
FROM dual 

UNION ALL

SELECT '审计管理' AS 一级模块, '审计成果审批' AS 二级模块, '' AS 三级模块, '是' AS 是否有流程, 
(SELECT COUNT(1) FROM aud_audit_Result t  ) AS 记录总数, 
(SELECT COUNT(1) FROM aud_audit_Result t WHERE t.flow_his_actor IS NOT NULL ) AS 业主所录记录数, 
(SELECT COUNT(1) FROM aud_audit_Result t WHERE t.flow_his_actor IS NULL ) AS 我们所录记录数 
FROM dual 

/*============================================================================================*/
~~~

### 合同管理和主材管理模块11月01-11月10日发起的流程明细数据导出

~~~sql
/** 合同审批*/
SELECT * FROM( 
SELECT 
'合同审批' AS 模块名称, 
t.audit_code AS 合同编号, t.NAME AS 合同名称, t.creator AS 创建人, t.creator_dept AS 创建人部门, t.create_date AS 创建时间, t.flow_end_date AS 流程结束时间 
FROM contr_contract_info t 
WHERE to_char(t.Create_Date, 'yyyy-mm-dd')>='2017-11-01' AND to_char(t.Create_Date, 'yyyy-mm-dd')<='2017-11-11' AND t.flow_status>-1 ORDER BY t.create_date DESC 
)
UNION ALL 

/** 变更立项*/
SELECT * FROM(
SELECT 
'变更立项' AS 模块名称, 
(SELECT c.audit_code FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同编号, 
(SELECT c.NAME FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同名称, 
t.creator AS 创建人, t.creator_dept AS 创建人部门, t.create_date AS 创建时间, t.flow_end_date AS 流程结束时间 
FROM contr_project_change t 
WHERE to_char(t.Create_Date, 'yyyy-mm-dd')>='2017-11-01' AND to_char(t.Create_Date, 'yyyy-mm-dd')<='2017-11-11' AND t.flow_status>-1 ORDER BY t.create_date DESC 
)
UNION ALL 

/** 变更价款*/
SELECT * FROM( 
SELECT 
'变更价款' AS 模块名称, 
(SELECT c.audit_code FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同编号, 
(SELECT c.NAME FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同名称, 
t.creator AS 创建人, t.creator_dept AS 创建人部门, t.create_date AS 创建时间, t.flow_end_date AS 流程结束时间 
FROM contr_price_change t 
WHERE to_char(t.Create_Date, 'yyyy-mm-dd')>='2017-11-01' AND to_char(t.Create_Date, 'yyyy-mm-dd')<='2017-11-11' AND t.flow_status>-1 ORDER BY t.create_date DESC
)
UNION ALL 

/** 综合变更*/
SELECT * FROM( 
SELECT 
'综合变更' AS 模块名称, 
(SELECT c.audit_code FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同编号, 
(SELECT c.NAME FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同名称, 
t.creator AS 创建人, t.creator_dept AS 创建人部门, t.create_date AS 创建时间, t.flow_end_date AS 流程结束时间 
FROM contr_integrate_change t 
WHERE to_char(t.Create_Date, 'yyyy-mm-dd')>='2017-11-01' AND to_char(t.Create_Date, 'yyyy-mm-dd')<='2017-11-11' AND t.flow_status>-1 ORDER BY t.create_date DESC
)
UNION ALL 

/** 预付款*/
SELECT * FROM( 
SELECT 
'预付款' AS 模块名称, 
(SELECT c.audit_code FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同编号, 
(SELECT c.NAME FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同名称, 
t.creator AS 创建人, t.creator_dept AS 创建人部门, t.create_date AS 创建时间, t.flow_end_date AS 流程结束时间 
FROM contr_advance_payment t 
WHERE to_char(t.Create_Date, 'yyyy-mm-dd')>='2017-11-01' AND to_char(t.Create_Date, 'yyyy-mm-dd')<='2017-11-11' AND t.flow_status>-1 ORDER BY t.create_date DESC
)
UNION ALL 

/** 进度款*/
SELECT * FROM( 
SELECT 
'进度款' AS 模块名称, 
(SELECT c.audit_code FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同编号, 
(SELECT c.NAME FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同名称, 
t.creator AS 创建人, t.creator_dept AS 创建人部门, t.create_date AS 创建时间, t.flow_end_date AS 流程结束时间 
FROM contr_progress_payment t 
WHERE to_char(t.Create_Date, 'yyyy-mm-dd')>='2017-11-01' AND to_char(t.Create_Date, 'yyyy-mm-dd')<='2017-11-11' AND t.flow_status>-1 ORDER BY t.create_date DESC
)
UNION ALL 

/** 支付申请*/
SELECT * FROM( 
SELECT 
'支付申请' AS 模块名称, 
(SELECT c.audit_code FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同编号, 
(SELECT c.NAME FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同名称, 
t.creator AS 创建人, t.creator_dept AS 创建人部门, t.create_date AS 创建时间, t.flow_end_date AS 流程结束时间 
FROM contr_contract_payment t 
WHERE to_char(t.Create_Date, 'yyyy-mm-dd')>='2017-11-01' AND to_char(t.Create_Date, 'yyyy-mm-dd')<='2017-11-11' AND t.flow_status>-1 ORDER BY t.create_date DESC
)
UNION ALL 

/** 完工结算*/
SELECT * FROM( 
SELECT 
'完工结算' AS 模块名称, 
(SELECT c.audit_code FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同编号, 
(SELECT c.NAME FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同名称, 
t.creator AS 创建人, t.creator_dept AS 创建人部门, t.create_date AS 创建时间, t.flow_end_date AS 流程结束时间 
FROM contr_contract_settle_up t 
WHERE to_char(t.Create_Date, 'yyyy-mm-dd')>='2017-11-01' AND to_char(t.Create_Date, 'yyyy-mm-dd')<='2017-11-11' AND t.flow_status>-1 ORDER BY t.create_date DESC
)
UNION ALL 

/** 保函管理*/
SELECT * FROM( 
SELECT 
'保函管理' AS 模块名称, 
t.contract_code AS 合同编号, t.contract_name AS 合同名称, t.creator AS 创建人, t.creator_dept AS 创建人部门, t.create_date AS 创建时间, t.flow_end_date AS 流程结束时间 
FROM contr_guarantee_letter t 
WHERE to_char(t.Create_Date, 'yyyy-mm-dd')>='2017-11-01' AND to_char(t.Create_Date, 'yyyy-mm-dd')<='2017-11-11' AND t.flow_status>-1 ORDER BY t.create_date DESC
)
UNION ALL 

/** ======================================================================================================================================*/

/** 需求计划*/
SELECT * FROM( 
SELECT 
'需求计划' AS 模块名称, 
(SELECT c.audit_code FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同编号, 
(SELECT c.NAME FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同名称, 
t.creator AS 创建人, t.creator_dept AS 创建人部门, t.create_date AS 创建时间, t.flow_end_date AS 流程结束时间 
FROM pur_purchase_plan t 
WHERE to_char(t.Create_Date, 'yyyy-mm-dd')>='2017-11-01' AND to_char(t.Create_Date, 'yyyy-mm-dd')<='2017-11-11' AND t.flow_status>-1 ORDER BY t.create_date DESC
)
UNION ALL 

/** 到货交接*/
SELECT * FROM( 
SELECT 
'到货交接' AS 模块名称, 
(SELECT c.audit_code FROM contr_contract_info c WHERE c.ID=t.supply_contract_id) AS 合同编号, 
(SELECT c.NAME FROM contr_contract_info c WHERE c.ID=t.supply_contract_id) AS 合同名称, 
t.creator AS 创建人, t.creator_dept AS 创建人部门, t.create_date AS 创建时间, t.flow_end_date AS 流程结束时间 
FROM pur_purchase_handover t 
WHERE to_char(t.Create_Date, 'yyyy-mm-dd')>='2017-11-01' AND to_char(t.Create_Date, 'yyyy-mm-dd')<='2017-11-11' AND t.flow_status>-1 ORDER BY t.create_date DESC
)
UNION ALL 

/** 材料扣款*/
SELECT * FROM( 
SELECT 
'材料扣款' AS 模块名称, 
(SELECT c.audit_code FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同编号, 
(SELECT c.NAME FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同名称, 
t.creator AS 创建人, t.creator_dept AS 创建人部门, t.create_date AS 创建时间, t.flow_end_date AS 流程结束时间 
FROM pur_purchase_pay t 
WHERE to_char(t.Create_Date, 'yyyy-mm-dd')>='2017-11-01' AND to_char(t.Create_Date, 'yyyy-mm-dd')<='2017-11-11' AND t.flow_status>-1 ORDER BY t.create_date DESC
)
UNION ALL 

/** 用料管理*/
SELECT * FROM( 
SELECT 
'用料管理' AS 模块名称, 
(SELECT c.audit_code FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同编号, 
(SELECT c.NAME FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同名称, 
t.creator AS 创建人, t.creator_dept AS 创建人部门, t.create_date AS 创建时间, t.flow_end_date AS 流程结束时间 
FROM pur_material_registration t 
WHERE to_char(t.Create_Date, 'yyyy-mm-dd')>='2017-11-01' AND to_char(t.Create_Date, 'yyyy-mm-dd')<='2017-11-11' AND t.flow_status>-1 ORDER BY t.create_date DESC
)
UNION ALL 

/** 材料价差*/
SELECT * FROM( 
SELECT 
'材料价差' AS 模块名称, 
(SELECT c.audit_code FROM contr_contract_info c WHERE c.ID=t.supply_contract_id) AS 合同编号, 
(SELECT c.NAME FROM contr_contract_info c WHERE c.ID=t.supply_contract_id) AS 合同名称, 
t.creator AS 创建人, t.creator_dept AS 创建人部门, t.create_date AS 创建时间, t.flow_end_date AS 流程结束时间 
FROM pur_purchase_price_gap t 
WHERE to_char(t.Create_Date, 'yyyy-mm-dd')>='2017-11-01' AND to_char(t.Create_Date, 'yyyy-mm-dd')<='2017-11-11' AND t.flow_status>-1 ORDER BY t.create_date DESC
)
UNION ALL 

/** 采购结算*/
SELECT * FROM( 
SELECT 
'采购结算' AS 模块名称, 
(SELECT c.audit_code FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同编号, 
(SELECT c.NAME FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同名称, 
t.creator AS 创建人, t.creator_dept AS 创建人部门, t.create_date AS 创建时间, t.flow_end_date AS 流程结束时间 
FROM pur_purchase_settle_up t 
WHERE to_char(t.Create_Date, 'yyyy-mm-dd')>='2017-11-01' AND to_char(t.Create_Date, 'yyyy-mm-dd')<='2017-11-11' AND t.flow_status>-1 ORDER BY t.create_date DESC
)
UNION ALL 

/** 运输结算*/
SELECT * FROM( 
SELECT 
'运输结算' AS 模块名称, 
(SELECT c.audit_code FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同编号, 
(SELECT c.NAME FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同名称, 
t.creator AS 创建人, t.creator_dept AS 创建人部门, t.create_date AS 创建时间, t.flow_end_date AS 流程结束时间 
FROM pur_transport_settle_up t 
WHERE to_char(t.Create_Date, 'yyyy-mm-dd')>='2017-11-01' AND to_char(t.Create_Date, 'yyyy-mm-dd')<='2017-11-11' AND t.flow_status>-1 ORDER BY t.create_date DESC
)
UNION ALL 

/** 到货移交*/
SELECT * FROM( 
SELECT 
'到货移交' AS 模块名称, 
(SELECT c.audit_code FROM contr_contract_info c WHERE c.ID=t.purchase_contract_id) AS 合同编号, 
(SELECT c.NAME FROM contr_contract_info c WHERE c.ID=t.purchase_contract_id) AS 合同名称, 
t.creator AS 创建人, t.creator_dept AS 创建人部门, t.create_date AS 创建时间, t.flow_end_date AS 流程结束时间 
FROM pur_delivery_goods t 
WHERE to_char(t.Create_Date, 'yyyy-mm-dd')>='2017-11-01' AND to_char(t.Create_Date, 'yyyy-mm-dd')<='2017-11-11' AND t.flow_status>-1 ORDER BY t.create_date DESC
)
UNION ALL 

/** 开箱检验*/
SELECT * FROM( 
SELECT 
'开箱检验' AS 模块名称, 
(SELECT c.audit_code FROM contr_contract_info c WHERE c.ID=t.purchase_contract_id) AS 合同编号, 
(SELECT c.NAME FROM contr_contract_info c WHERE c.ID=t.purchase_contract_id) AS 合同名称, 
t.creator AS 创建人, t.creator_dept AS 创建人部门, t.create_date AS 创建时间, t.flow_end_date AS 流程结束时间 
FROM pur_box_audit t 
WHERE to_char(t.Create_Date, 'yyyy-mm-dd')>='2017-11-01' AND to_char(t.Create_Date, 'yyyy-mm-dd')<='2017-11-11' AND t.flow_status>-1 ORDER BY t.create_date DESC
)
UNION ALL 

/** 设备领用*/
SELECT * FROM( 
SELECT 
'设备领用' AS 模块名称, 
(SELECT c.audit_code FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同编号, 
(SELECT c.NAME FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同名称, 
t.creator AS 创建人, t.creator_dept AS 创建人部门, t.create_date AS 创建时间, t.flow_end_date AS 流程结束时间 
FROM pur_facility_receive t 
WHERE to_char(t.Create_Date, 'yyyy-mm-dd')>='2017-11-01' AND to_char(t.Create_Date, 'yyyy-mm-dd')<='2017-11-11' AND t.flow_status>-1 ORDER BY t.create_date DESC
)
UNION ALL 

/** 备件领用*/
SELECT * FROM( 
SELECT 
'备件领用' AS 模块名称, 
(SELECT c.audit_code FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同编号, 
(SELECT c.NAME FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同名称, 
t.creator AS 创建人, t.creator_dept AS 创建人部门, t.create_date AS 创建时间, t.flow_end_date AS 流程结束时间 
FROM pur_spare_parts_receive t 
WHERE to_char(t.Create_Date, 'yyyy-mm-dd')>='2017-11-01' AND to_char(t.Create_Date, 'yyyy-mm-dd')<='2017-11-11' AND t.flow_status>-1 ORDER BY t.create_date DESC
)
UNION ALL 

/** 备件归还*/
SELECT * FROM( 
SELECT 
'备件归还' AS 模块名称, 
(SELECT c.audit_code FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同编号, 
(SELECT c.NAME FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同名称, 
t.creator AS 创建人, t.creator_dept AS 创建人部门, t.create_date AS 创建时间, t.flow_end_date AS 流程结束时间 
FROM pur_spare_parts_return t 
WHERE to_char(t.Create_Date, 'yyyy-mm-dd')>='2017-11-01' AND to_char(t.Create_Date, 'yyyy-mm-dd')<='2017-11-11' AND t.flow_status>-1 ORDER BY t.create_date DESC
)
UNION ALL 

/** 工具领用*/
SELECT * FROM( 
SELECT 
'工具领用' AS 模块名称, 
(SELECT c.audit_code FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同编号, 
(SELECT c.NAME FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同名称, 
t.creator AS 创建人, t.creator_dept AS 创建人部门, t.create_date AS 创建时间, t.flow_end_date AS 流程结束时间 
FROM pur_borrow_special_tool t 
WHERE to_char(t.Create_Date, 'yyyy-mm-dd')>='2017-11-01' AND to_char(t.Create_Date, 'yyyy-mm-dd')<='2017-11-11' AND t.flow_status>-1 ORDER BY t.create_date DESC
)
UNION ALL 

/** 工具归还*/
SELECT * FROM( 
SELECT 
'工具归还' AS 模块名称, 
(SELECT c.audit_code FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同编号, 
(SELECT c.NAME FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同名称, 
t.creator AS 创建人, t.creator_dept AS 创建人部门, t.create_date AS 创建时间, t.flow_end_date AS 流程结束时间 
FROM pur_return_tool t 
WHERE to_char(t.Create_Date, 'yyyy-mm-dd')>='2017-11-01' AND to_char(t.Create_Date, 'yyyy-mm-dd')<='2017-11-11' AND t.flow_status>-1 ORDER BY t.create_date DESC
)
UNION ALL 

/** 设备缺陷*/
SELECT * FROM( 
SELECT 
'设备缺陷' AS 模块名称, 
(SELECT c.audit_code FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同编号, 
(SELECT c.NAME FROM contr_contract_info c WHERE c.ID=t.contract_id) AS 合同名称, 
t.creator AS 创建人, t.creator_dept AS 创建人部门, t.create_date AS 创建时间, t.flow_end_date AS 流程结束时间 
FROM pur_facility_problem t 
WHERE to_char(t.Create_Date, 'yyyy-mm-dd')>='2017-11-01' AND to_char(t.Create_Date, 'yyyy-mm-dd')<='2017-11-11' AND t.flow_status>-1 ORDER BY t.create_date DESC
)
UNION ALL 

/** 电量计量*/
SELECT * FROM( 
SELECT 
'电量计量' AS 模块名称, 
t.audit_code AS 合同编号, 
t.NAME AS 合同名称, 
t.creator AS 创建人, t.creator_dept AS 创建人部门, t.create_date AS 创建时间, t.flow_end_date AS 流程结束时间 
FROM pur_electricity_bill t 
WHERE to_char(t.Create_Date, 'yyyy-mm-dd')>='2017-11-01' AND to_char(t.Create_Date, 'yyyy-mm-dd')<='2017-11-11' AND t.flow_status>-1 ORDER BY t.create_date DESC
)
UNION ALL 

/** 电费汇总核扣*/
SELECT * FROM( 
SELECT 
'电费汇总核扣' AS 模块名称, 
t.audit_code AS 合同编号, 
t.NAME AS 合同名称, 
t.creator AS 创建人, t.creator_dept AS 创建人部门, t.create_date AS 创建时间, t.flow_end_date AS 流程结束时间 
FROM pur_electricity_summary t 
WHERE to_char(t.Create_Date, 'yyyy-mm-dd')>='2017-11-01' AND to_char(t.Create_Date, 'yyyy-mm-dd')<='2017-11-11' AND t.flow_status>-1 ORDER BY t.create_date DESC
)
~~~

### 检查待办已办

~~~sql
--检查待办已办表有无插入流程待办已办.

/*待办*/
SELECT 
  * 
FROM dtxworkflow.bpm_task_opinion o 
WHERE 1=1 
AND o.exefullname IS NOT NULL 
AND o.exefullname NOT LIKE '超级管理员%' 
AND o.endtime IS NULL 
AND to_char(o.starttime, 'yyyy-mm-dd') IN ('2018-06-07', '2018-06-08', '2018-06-09') 
AND NOT EXISTS ( 
   SELECT 1 FROM task_center t WHERE t.id=o.opinionid 
); 

/*已办*/
SELECT 
  * 
FROM dtxworkflow.bpm_task_opinion o 
WHERE 1=1 
AND o.exefullname IS NOT NULL 
AND o.exefullname NOT LIKE '超级管理员%' 
AND o.endtime IS NOT NULL 
AND (
to_char(o.starttime, 'yyyy-mm-dd') IN ('2018-06-07', '2018-06-08', '2018-06-09') 
OR 
to_char(o.endtime, 'yyyy-mm-dd') IN ('2018-06-07', '2018-06-08', '2018-06-09') 
)
AND NOT EXISTS ( 
   SELECT 1 FROM task_done t WHERE t.id=o.opinionid 
); 
~~~

### 待办已办历史数据补编号

~~~sql
--待办历史数据补编号.
SELECT * FROM task_center todo WHERE todo.task_form_code IS NULL; 

UPDATE task_center todo SET todo.task_form_code = ( 
   CASE todo.task_type 
     
     WHEN '控制价格审批' THEN (SELECT iit.new_tender_code FROM iten_price_control ipc LEFT JOIN iten_invite_tender iit ON iit.ID=ipc.invite_tender_id WHERE ipc.ID=todo.business_id) 
     WHEN '招标文件发布' THEN (SELECT iitp.invite_tender_code FROM iten_invite_tender_publish iitp WHERE iitp.ID=todo.business_id) 
     WHEN '招标文件澄清' THEN (SELECT iitp.invite_tender_code FROM iten_invite_tender_publish iitp LEFT JOIN iten_tender_doc_update itdu ON itdu.invite_tender_id=iitp.invite_tender_id WHERE itdu.ID=todo.business_id) 
     WHEN '中标候选人公示' THEN (SELECT iitp.invite_tender_code FROM iten_invite_tender_publish iitp LEFT JOIN iten_candidate_publish icp ON icp.invite_tender_id=iitp.invite_tender_id WHERE icp.ID=todo.business_id) 
     WHEN '中标通知书审批' THEN (SELECT iitp.invite_tender_code FROM iten_invite_tender_publish iitp LEFT JOIN iten_bid_person_publish ibpp ON ibpp.invite_tender_id=iitp.invite_tender_id WHERE ibpp.ID=todo.business_id) 
     WHEN '询价申请' THEN (SELECT icpa.apply_code FROM iten_consult_price_apply icpa WHERE icpa.ID=todo.business_id) 
     WHEN '询价方案审批' THEN (SELECT icpa.apply_code FROM iten_consult_plan_approval icpap LEFT JOIN iten_consult_price_apply icpa ON icpa.ID=icpap.consult_price_apply_id WHERE icpap.ID=todo.business_id) 
     WHEN '筛选供应商' THEN (SELECT icpa.apply_code FROM iten_choose_consult_supplier iccs LEFT JOIN iten_consult_price_apply icpa ON icpa.ID=iccs.consult_price_apply_id WHERE iccs.ID=todo.business_id) 
     WHEN '询价结果审批' THEN (SELECT icpa.apply_code FROM iten_consult_result_approval icra LEFT JOIN iten_consult_price_apply icpa ON icpa.ID=icra.consult_price_apply_id WHERE icra.ID=todo.business_id) 
     
     WHEN '合同审批' THEN (SELECT cci.audit_code FROM contr_contract_info cci WHERE cci.ID=todo.business_id) 
     WHEN '变更立项' THEN (SELECT cpc.audit_code FROM contr_project_change cpc WHERE cpc.ID=todo.business_id) 
     WHEN '变更价款' THEN (SELECT cpc.audit_code FROM contr_price_change cpc WHERE cpc.ID=todo.business_id) 
     WHEN '预付款' THEN (SELECT cap.document_number FROM contr_advance_payment cap WHERE cap.ID=todo.business_id) 
     WHEN '进度款' THEN (SELECT cpp.document_number FROM contr_progress_payment cpp WHERE cpp.ID=todo.business_id) 
     WHEN '支付申请' THEN (SELECT ccp.document_number FROM contr_contract_payment ccp WHERE ccp.ID=todo.business_id) 
     WHEN '完工结算' THEN (SELECT cci.audit_code FROM contr_contract_settle_up ccsu LEFT JOIN contr_contract_info cci ON cci.ID=ccsu.contract_id WHERE ccsu.ID=todo.business_id) 
     WHEN '保函管理' THEN (SELECT cgl.guarantee_code FROM contr_guarantee_letter cgl WHERE cgl.ID=todo.business_id) 
     
     WHEN '需求计划' THEN (SELECT ppp.Audit_Code FROM pur_purchase_plan ppp WHERE ppp.ID=todo.business_id) 
     WHEN '采购需求计划' THEN (SELECT ppp.Audit_Code FROM pur_purchase_plan ppp WHERE ppp.ID=todo.business_id) 
     WHEN '到货交接' THEN (SELECT pph.Audit_Code FROM pur_purchase_handover pph WHERE pph.ID=todo.business_id) 
     WHEN '材料扣款' THEN (SELECT ppp.Audit_Code FROM pur_purchase_pay ppp WHERE ppp.ID=todo.business_id) 
     WHEN '物资扣款管理' THEN (SELECT ppp.Audit_Code FROM pur_purchase_pay ppp WHERE ppp.ID=todo.business_id) 
     WHEN '用料管理' THEN (SELECT pmr.Audit_Code FROM pur_material_registration pmr WHERE pmr.ID=todo.business_id) 
     WHEN '材料价差' THEN (SELECT pppg.Audit_Code FROM pur_purchase_price_gap pppg WHERE pppg.ID=todo.business_id) 
     WHEN '采购结算' THEN (SELECT ppsu.Audit_Code FROM pur_purchase_settle_up ppsu WHERE ppsu.ID=todo.business_id) 
     WHEN '运输结算' THEN (SELECT ptsu.Audit_Code FROM pur_transport_settle_up ptsu WHERE ptsu.ID=todo.business_id) 
     WHEN '设备需求计划' THEN (SELECT pfpp.code FROM pur_facility_purchase_plan pfpp WHERE pfpp.ID=todo.business_id) 
     WHEN '到货移交' THEN (SELECT pdg.arrival_Code FROM pur_delivery_goods pdg WHERE pdg.ID=todo.business_id) 
     WHEN '设备开箱检验' THEN (SELECT pba.Audit_Code FROM pur_box_audit pba WHERE pba.ID=todo.business_id) 
     WHEN '设备领用' THEN (SELECT pfr.Audit_Code FROM pur_facility_receive pfr WHERE pfr.ID=todo.business_id) 
     WHEN '备件领用' THEN (SELECT pspr.Audit_Code FROM pur_spare_parts_receive pspr WHERE pspr.ID=todo.business_id) 
     WHEN '备件归还' THEN (SELECT pspr.Audit_Code FROM pur_spare_parts_return pspr WHERE pspr.ID=todo.business_id) 
     WHEN '工具领用' THEN (SELECT pbst.Audit_Code FROM pur_borrow_special_tool pbst WHERE pbst.ID=todo.business_id) 
     WHEN '工具归还' THEN (SELECT prt.Audit_Code FROM pur_return_tool prt WHERE prt.ID=todo.business_id) 
     WHEN '设备缺陷处置' THEN (SELECT pfd.disposal_code FROM pur_facility_disposal pfd WHERE pfd.ID=todo.business_id) 
     WHEN '电量计量' THEN (SELECT peb.Audit_Code FROM pur_electricity_bill peb WHERE peb.ID=todo.business_id) 
     WHEN '电费汇总核扣' THEN (SELECT pes.audit_code FROM pur_electricity_summary pes WHERE pes.ID=todo.business_id) 
     
     WHEN '计量单审批' THEN (SELECT ccb.calculate_code FROM contr_calculate_bill ccb WHERE ccb.ID=todo.business_id) 
     WHEN '工程常用报表' THEN (SELECT eer.report_code FROM exec_engineering_report eer WHERE eer.ID=todo.business_id) 
     WHEN '工作联系单' THEN (SELECT ewcs.contact_code FROM exec_work_contact_sheet ewcs WHERE ewcs.ID=todo.business_id) 
     
     WHEN '科研成果' THEN (SELECT cci.audit_code FROM devm_scientific_check dsc LEFT JOIN contr_contract_info cci ON cci.ID=dsc.contract_id WHERE dsc.ID=todo.business_id) 
     
     WHEN '安全生产投入' THEN (SELECT sspi.examine_code FROM sec_safety_production_inputs sspi WHERE sspi.ID=todo.business_id) 
     WHEN '安全生产费用' THEN (SELECT sspi.examine_code FROM sec_safety_production_cost sspc LEFT JOIN sec_safety_production_inputs sspi ON sspi.ID=sspc.production_inputs_id WHERE sspc.ID=todo.business_id) 
     
     WHEN '审计立项' THEN (SELECT aamp.audit_code FROM aud_audit_manage_project aamp WHERE aamp.ID=todo.business_id) 
     WHEN '审计通知书下达' THEN (SELECT aamp.audit_code FROM aud_task_audit ata LEFT JOIN aud_audit_manage_project aamp ON aamp.ID=ata.audit_manage_project_id WHERE ata.ID=todo.business_id) 
     WHEN '审计成果审批' THEN (SELECT aamp.audit_code FROM aud_audit_result aar LEFT JOIN aud_audit_manage_project aamp ON aamp.ID=aar.audit_manage_project_id WHERE aar.ID=todo.business_id) 
     WHEN '审计意见书下达' THEN (SELECT aamp.audit_code FROM aud_problem_reform apr LEFT JOIN aud_task_audit ata ON ata.ID=apr.task_audit_id LEFT JOIN aud_audit_manage_project aamp ON aamp.ID=ata.audit_manage_project_id WHERE apr.ID=todo.business_id) 
     WHEN '审计整改反馈' THEN (SELECT aamp.audit_code FROM aud_problem_reform_reply aprr LEFT JOIN aud_problem_reform apr ON apr.ID=aprr.problem_reform_id LEFT JOIN aud_task_audit ata ON ata.ID=apr.task_audit_id LEFT JOIN aud_audit_manage_project aamp ON aamp.ID=ata.audit_manage_project_id WHERE aprr.ID=todo.business_id) 
     
     ELSE '' 
   END 
) 
WHERE todo.task_form_code IS NULL; 



--已办历史数据补编号.
SELECT * FROM task_done todo WHERE todo.task_form_code IS NULL; 

UPDATE task_done todo SET todo.task_form_code = ( 
   CASE todo.task_type 
     
     WHEN '控制价格审批' THEN (SELECT iit.new_tender_code FROM iten_price_control ipc LEFT JOIN iten_invite_tender iit ON iit.ID=ipc.invite_tender_id WHERE ipc.ID=todo.business_id) 
     WHEN '招标文件发布' THEN (SELECT iitp.invite_tender_code FROM iten_invite_tender_publish iitp WHERE iitp.ID=todo.business_id) 
     WHEN '招标文件澄清' THEN (SELECT iitp.invite_tender_code FROM iten_invite_tender_publish iitp LEFT JOIN iten_tender_doc_update itdu ON itdu.invite_tender_id=iitp.invite_tender_id WHERE itdu.ID=todo.business_id) 
     WHEN '中标候选人公示' THEN (SELECT iitp.invite_tender_code FROM iten_invite_tender_publish iitp LEFT JOIN iten_candidate_publish icp ON icp.invite_tender_id=iitp.invite_tender_id WHERE icp.ID=todo.business_id) 
     WHEN '中标通知书审批' THEN (SELECT iitp.invite_tender_code FROM iten_invite_tender_publish iitp LEFT JOIN iten_bid_person_publish ibpp ON ibpp.invite_tender_id=iitp.invite_tender_id WHERE ibpp.ID=todo.business_id) 
     WHEN '询价申请' THEN (SELECT icpa.apply_code FROM iten_consult_price_apply icpa WHERE icpa.ID=todo.business_id) 
     WHEN '询价方案审批' THEN (SELECT icpa.apply_code FROM iten_consult_plan_approval icpap LEFT JOIN iten_consult_price_apply icpa ON icpa.ID=icpap.consult_price_apply_id WHERE icpap.ID=todo.business_id) 
     WHEN '筛选供应商' THEN (SELECT icpa.apply_code FROM iten_choose_consult_supplier iccs LEFT JOIN iten_consult_price_apply icpa ON icpa.ID=iccs.consult_price_apply_id WHERE iccs.ID=todo.business_id) 
     WHEN '询价结果审批' THEN (SELECT icpa.apply_code FROM iten_consult_result_approval icra LEFT JOIN iten_consult_price_apply icpa ON icpa.ID=icra.consult_price_apply_id WHERE icra.ID=todo.business_id) 
     
     WHEN '合同审批' THEN (SELECT cci.audit_code FROM contr_contract_info cci WHERE cci.ID=todo.business_id) 
     WHEN '变更立项' THEN (SELECT cpc.audit_code FROM contr_project_change cpc WHERE cpc.ID=todo.business_id) 
     WHEN '变更价款' THEN (SELECT cpc.audit_code FROM contr_price_change cpc WHERE cpc.ID=todo.business_id) 
     WHEN '预付款' THEN (SELECT cap.document_number FROM contr_advance_payment cap WHERE cap.ID=todo.business_id) 
     WHEN '进度款' THEN (SELECT cpp.document_number FROM contr_progress_payment cpp WHERE cpp.ID=todo.business_id) 
     WHEN '支付申请' THEN (SELECT ccp.document_number FROM contr_contract_payment ccp WHERE ccp.ID=todo.business_id) 
     WHEN '完工结算' THEN (SELECT cci.audit_code FROM contr_contract_settle_up ccsu LEFT JOIN contr_contract_info cci ON cci.ID=ccsu.contract_id WHERE ccsu.ID=todo.business_id) 
     WHEN '保函管理' THEN (SELECT cgl.guarantee_code FROM contr_guarantee_letter cgl WHERE cgl.ID=todo.business_id) 
     
     WHEN '需求计划' THEN (SELECT ppp.Audit_Code FROM pur_purchase_plan ppp WHERE ppp.ID=todo.business_id) 
     WHEN '采购需求计划' THEN (SELECT ppp.Audit_Code FROM pur_purchase_plan ppp WHERE ppp.ID=todo.business_id) 
     WHEN '到货交接' THEN (SELECT pph.Audit_Code FROM pur_purchase_handover pph WHERE pph.ID=todo.business_id) 
     WHEN '材料扣款' THEN (SELECT ppp.Audit_Code FROM pur_purchase_pay ppp WHERE ppp.ID=todo.business_id) 
     WHEN '物资扣款管理' THEN (SELECT ppp.Audit_Code FROM pur_purchase_pay ppp WHERE ppp.ID=todo.business_id) 
     WHEN '用料管理' THEN (SELECT pmr.Audit_Code FROM pur_material_registration pmr WHERE pmr.ID=todo.business_id) 
     WHEN '材料价差' THEN (SELECT pppg.Audit_Code FROM pur_purchase_price_gap pppg WHERE pppg.ID=todo.business_id) 
     WHEN '采购结算' THEN (SELECT ppsu.Audit_Code FROM pur_purchase_settle_up ppsu WHERE ppsu.ID=todo.business_id) 
     WHEN '运输结算' THEN (SELECT ptsu.Audit_Code FROM pur_transport_settle_up ptsu WHERE ptsu.ID=todo.business_id) 
     WHEN '设备需求计划' THEN (SELECT pfpp.code FROM pur_facility_purchase_plan pfpp WHERE pfpp.ID=todo.business_id) 
     WHEN '到货移交' THEN (SELECT pdg.arrival_Code FROM pur_delivery_goods pdg WHERE pdg.ID=todo.business_id) 
     WHEN '设备开箱检验' THEN (SELECT pba.Audit_Code FROM pur_box_audit pba WHERE pba.ID=todo.business_id) 
     WHEN '设备领用' THEN (SELECT pfr.Audit_Code FROM pur_facility_receive pfr WHERE pfr.ID=todo.business_id) 
     WHEN '备件领用' THEN (SELECT pspr.Audit_Code FROM pur_spare_parts_receive pspr WHERE pspr.ID=todo.business_id) 
     WHEN '备件归还' THEN (SELECT pspr.Audit_Code FROM pur_spare_parts_return pspr WHERE pspr.ID=todo.business_id) 
     WHEN '工具领用' THEN (SELECT pbst.Audit_Code FROM pur_borrow_special_tool pbst WHERE pbst.ID=todo.business_id) 
     WHEN '工具归还' THEN (SELECT prt.Audit_Code FROM pur_return_tool prt WHERE prt.ID=todo.business_id) 
     WHEN '设备缺陷处置' THEN (SELECT pfd.disposal_code FROM pur_facility_disposal pfd WHERE pfd.ID=todo.business_id) 
     WHEN '电量计量' THEN (SELECT peb.Audit_Code FROM pur_electricity_bill peb WHERE peb.ID=todo.business_id) 
     WHEN '电费汇总核扣' THEN (SELECT pes.audit_code FROM pur_electricity_summary pes WHERE pes.ID=todo.business_id) 
     
     WHEN '计量单审批' THEN (SELECT ccb.calculate_code FROM contr_calculate_bill ccb WHERE ccb.ID=todo.business_id) 
     WHEN '工程常用报表' THEN (SELECT eer.report_code FROM exec_engineering_report eer WHERE eer.ID=todo.business_id) 
     WHEN '工作联系单' THEN (SELECT ewcs.contact_code FROM exec_work_contact_sheet ewcs WHERE ewcs.ID=todo.business_id) 
     
     WHEN '科研成果' THEN (SELECT cci.audit_code FROM devm_scientific_check dsc LEFT JOIN contr_contract_info cci ON cci.ID=dsc.contract_id WHERE dsc.ID=todo.business_id) 
     
     WHEN '安全生产投入' THEN (SELECT sspi.examine_code FROM sec_safety_production_inputs sspi WHERE sspi.ID=todo.business_id) 
     WHEN '安全生产费用' THEN (SELECT sspi.examine_code FROM sec_safety_production_cost sspc LEFT JOIN sec_safety_production_inputs sspi ON sspi.ID=sspc.production_inputs_id WHERE sspc.ID=todo.business_id) 
     
     WHEN '审计立项' THEN (SELECT aamp.audit_code FROM aud_audit_manage_project aamp WHERE aamp.ID=todo.business_id) 
     WHEN '审计通知书下达' THEN (SELECT aamp.audit_code FROM aud_task_audit ata LEFT JOIN aud_audit_manage_project aamp ON aamp.ID=ata.audit_manage_project_id WHERE ata.ID=todo.business_id) 
     WHEN '审计成果审批' THEN (SELECT aamp.audit_code FROM aud_audit_result aar LEFT JOIN aud_audit_manage_project aamp ON aamp.ID=aar.audit_manage_project_id WHERE aar.ID=todo.business_id) 
     WHEN '审计意见书下达' THEN (SELECT aamp.audit_code FROM aud_problem_reform apr LEFT JOIN aud_task_audit ata ON ata.ID=apr.task_audit_id LEFT JOIN aud_audit_manage_project aamp ON aamp.ID=ata.audit_manage_project_id WHERE apr.ID=todo.business_id) 
     WHEN '审计整改反馈' THEN (SELECT aamp.audit_code FROM aud_problem_reform_reply aprr LEFT JOIN aud_problem_reform apr ON apr.ID=aprr.problem_reform_id LEFT JOIN aud_task_audit ata ON ata.ID=apr.task_audit_id LEFT JOIN aud_audit_manage_project aamp ON aamp.ID=ata.audit_manage_project_id WHERE aprr.ID=todo.business_id) 
     
     ELSE '' 
   END 
) 
WHERE todo.task_form_code IS NULL; 
~~~

### 经办人归档环节补转发记录数据

~~~sql
INSERT INTO TASK_DONE( 
       ID, 
       TASK_TITLE, 
       TASK_ID, 
       TASK_SOURCE, 
       TASK_TYPE, 
       ARRIVAL_TIME, 
       JUMP_URL, 
       SENDER, 
       SENDER_ID, 
       URGENCY, 
       EXPIRATION_TIME, 
       CONDUCTOR_ID, 
       CONDUCTOR, 
       DYNAMIC_PARAMETER, 
       TASK_NODE, 
       DESCRIPTION, 
       TASK_SOURCE_NAME, 
       USERPOSI_ID, 
       BUSINESS_ID, 
       SUGGESTION, 
       EXEC_TIME, 
       FLOW_STATUS, 
       TASK_NODE_KEY, 
       SUBMIT_TYPE 
) 
SELECT 
       sys_guid(), 
       t.task_title, 
       NULL, 
       t.task_source, 
       t.task_type, 
       /*到达时间*/to_date('2018-05-16 15:44:19', 'yyyy-mm-dd hh24:mi:ss'), 
       t.jump_url, 
       t.sender, 
       t.sender_id, 
       NULL, 
       NULL, 
       /*处理人ID*/(SELECT DISTINCT u.ID FROM Sys_User u WHERE u.account='songliangxi' ), 
       /*处理人*/'宋良西', 
       /*参数*/NULL, 
       '转发', 
       NULL, 
       '转发', 
       /*履职ID*/(SELECT sup.id FROM Sys_User_Posi sup LEFT JOIN sys_user su ON su.ID=sup.user_id WHERE su.account='songliangxi' ), 
       t.business_id, 
       '同意', 
       /*处理时间*/to_date('2018-05-16 15:44:19', 'yyyy-mm-dd hh24:mi:ss'),
       2, 
       t.task_node_key, 
       NULL 
FROM TASK_DONE t WHERE t.business_Id = /*业务ID*/'402848dd6366de5d01636cf9c6e209c3' AND t.task_node='经办人归档' 
~~~

~~~sql
INSERT INTO TASK_DONE( 
       ID,TASK_TITLE,TASK_ID,TASK_SOURCE,TASK_TYPE,ARRIVAL_TIME,JUMP_URL,SENDER,SENDER_ID,URGENCY,EXPIRATION_TIME,CONDUCTOR_ID,CONDUCTOR,DYNAMIC_PARAMETER,TASK_NODE,DESCRIPTION,TASK_SOURCE_NAME,USERPOSI_ID,BUSINESS_ID,SUGGESTION,EXEC_TIME,FLOW_STATUS,TASK_NODE_KEY,SUBMIT_TYPE 
) 
SELECT 
       sys_guid(),t.task_title,NULL,t.task_source,t.task_type, 
       /*到达时间*/to_date('2018-05-16 15:44:19', 'yyyy-mm-dd hh24:mi:ss'), 
       
       t.jump_url,t.sender,t.sender_id,NULL,NULL, 
       /*处理人ID*/(SELECT DISTINCT u.ID FROM Sys_User u WHERE u.account='liaozhiwei' ), 
       /*处理人*/'廖志伟', 
       
       /*参数*/NULL,'转发',NULL, 
       '转发', 
       /*履职ID*/(SELECT sup.id FROM Sys_User_Posi sup LEFT JOIN sys_user su ON su.ID=sup.user_id WHERE su.account='liaozhiwei' ), 
       
       t.business_id,'同意', 
       /*处理时间*/to_date('2018-05-16 15:57:46', 'yyyy-mm-dd hh24:mi:ss'),
       
       2,t.task_node_key,NULL 
FROM TASK_DONE t WHERE t.business_Id = /*业务ID*/'ff808081634f589501635dc53bc9322c' AND t.task_node='经办人归档' ;



INSERT INTO TASK_DONE( 
       ID,TASK_TITLE,TASK_ID,TASK_SOURCE,TASK_TYPE,ARRIVAL_TIME,JUMP_URL,SENDER,SENDER_ID,URGENCY,EXPIRATION_TIME,CONDUCTOR_ID,CONDUCTOR,DYNAMIC_PARAMETER,TASK_NODE,DESCRIPTION,TASK_SOURCE_NAME,USERPOSI_ID,BUSINESS_ID,SUGGESTION,EXEC_TIME,FLOW_STATUS,TASK_NODE_KEY,SUBMIT_TYPE 
) 
SELECT 
       sys_guid(),t.task_title,NULL,t.task_source,t.task_type, 
       /*到达时间*/to_date('2018-05-16 15:44:19', 'yyyy-mm-dd hh24:mi:ss'), 
       
       t.jump_url,t.sender,t.sender_id,NULL,NULL, 
       /*处理人ID*/(SELECT DISTINCT u.ID FROM Sys_User u WHERE u.account='yangqixiang' ), 
       /*处理人*/'杨启祥', 
       
       /*参数*/NULL,'转发',NULL, 
       '转发', 
       /*履职ID*/(SELECT sup.id FROM Sys_User_Posi sup LEFT JOIN sys_user su ON su.ID=sup.user_id WHERE su.account='yangqixiang' ), 
       
       t.business_id,'同意', 
       /*处理时间*/to_date('2018-05-16 16:01:36', 'yyyy-mm-dd hh24:mi:ss'),
       
       2,t.task_node_key,NULL 
FROM TASK_DONE t WHERE t.business_Id = /*业务ID*/'ff808081634f589501635dc53bc9322c' AND t.task_node='经办人归档' ;



INSERT INTO TASK_DONE( 
       ID,TASK_TITLE,TASK_ID,TASK_SOURCE,TASK_TYPE,ARRIVAL_TIME,JUMP_URL,SENDER,SENDER_ID,URGENCY,EXPIRATION_TIME,CONDUCTOR_ID,CONDUCTOR,DYNAMIC_PARAMETER,TASK_NODE,DESCRIPTION,TASK_SOURCE_NAME,USERPOSI_ID,BUSINESS_ID,SUGGESTION,EXEC_TIME,FLOW_STATUS,TASK_NODE_KEY,SUBMIT_TYPE 
) 
SELECT 
       sys_guid(),t.task_title,NULL,t.task_source,t.task_type, 
       /*到达时间*/to_date('2018-05-16 15:44:19', 'yyyy-mm-dd hh24:mi:ss'), 
       
       t.jump_url,t.sender,t.sender_id,NULL,NULL, 
       /*处理人ID*/(SELECT DISTINCT u.ID FROM Sys_User u WHERE u.account='weizengzhong' ), 
       /*处理人*/'韦増忠', 
       
       /*参数*/NULL,'转发',NULL, 
       '转发', 
       /*履职ID*/(SELECT sup.id FROM Sys_User_Posi sup LEFT JOIN sys_user su ON su.ID=sup.user_id WHERE su.account='weizengzhong' ), 
       
       t.business_id,'同意', 
       /*处理时间*/to_date('2018-05-16 15:59:31', 'yyyy-mm-dd hh24:mi:ss'),
       
       2,t.task_node_key,NULL 
FROM TASK_DONE t WHERE t.business_Id = /*业务ID*/'ff808081634f589501635dc53bc9322c' AND t.task_node='经办人归档' ;



INSERT INTO TASK_DONE( 
       ID,TASK_TITLE,TASK_ID,TASK_SOURCE,TASK_TYPE,ARRIVAL_TIME,JUMP_URL,SENDER,SENDER_ID,URGENCY,EXPIRATION_TIME,CONDUCTOR_ID,CONDUCTOR,DYNAMIC_PARAMETER,TASK_NODE,DESCRIPTION,TASK_SOURCE_NAME,USERPOSI_ID,BUSINESS_ID,SUGGESTION,EXEC_TIME,FLOW_STATUS,TASK_NODE_KEY,SUBMIT_TYPE 
) 
SELECT 
       sys_guid(),t.task_title,NULL,t.task_source,t.task_type, 
       /*到达时间*/to_date('2018-05-16 15:44:19', 'yyyy-mm-dd hh24:mi:ss'), 
       
       t.jump_url,t.sender,t.sender_id,NULL,NULL, 
       /*处理人ID*/(SELECT DISTINCT u.ID FROM Sys_User u WHERE u.account='yangxibin' ), 
       /*处理人*/'杨溪滨', 
       
       /*参数*/NULL,'转发',NULL, 
       '转发', 
       /*履职ID*/(SELECT sup.id FROM Sys_User_Posi sup LEFT JOIN sys_user su ON su.ID=sup.user_id WHERE su.account='yangxibin' ), 
       
       t.business_id,'同意', 
       /*处理时间*/to_date('2018-05-16 15:54:49', 'yyyy-mm-dd hh24:mi:ss'),
       
       2,t.task_node_key,NULL 
FROM TASK_DONE t WHERE t.business_Id = /*业务ID*/'ff808081634f589501635dc53bc9322c' AND t.task_node='经办人归档' ;



INSERT INTO TASK_DONE( 
       ID,TASK_TITLE,TASK_ID,TASK_SOURCE,TASK_TYPE,ARRIVAL_TIME,JUMP_URL,SENDER,SENDER_ID,URGENCY,EXPIRATION_TIME,CONDUCTOR_ID,CONDUCTOR,DYNAMIC_PARAMETER,TASK_NODE,DESCRIPTION,TASK_SOURCE_NAME,USERPOSI_ID,BUSINESS_ID,SUGGESTION,EXEC_TIME,FLOW_STATUS,TASK_NODE_KEY,SUBMIT_TYPE 
) 
SELECT 
       sys_guid(),t.task_title,NULL,t.task_source,t.task_type, 
       /*到达时间*/to_date('2018-05-16 15:44:19', 'yyyy-mm-dd hh24:mi:ss'), 
       
       t.jump_url,t.sender,t.sender_id,NULL,NULL, 
       /*处理人ID*/(SELECT DISTINCT u.ID FROM Sys_User u WHERE u.account='xinyonggang' ), 
       /*处理人*/'辛永刚', 
       
       /*参数*/NULL,'转发',NULL, 
       '转发', 
       /*履职ID*/(SELECT sup.id FROM Sys_User_Posi sup LEFT JOIN sys_user su ON su.ID=sup.user_id WHERE su.account='xinyonggang' ), 
       
       t.business_id,'同意', 
       /*处理时间*/to_date('2018-05-16 16:09:09', 'yyyy-mm-dd hh24:mi:ss'),
       
       2,t.task_node_key,NULL 
FROM TASK_DONE t WHERE t.business_Id = /*业务ID*/'ff808081634f589501635dc53bc9322c' AND t.task_node='经办人归档' ;



INSERT INTO TASK_DONE( 
       ID,TASK_TITLE,TASK_ID,TASK_SOURCE,TASK_TYPE,ARRIVAL_TIME,JUMP_URL,SENDER,SENDER_ID,URGENCY,EXPIRATION_TIME,CONDUCTOR_ID,CONDUCTOR,DYNAMIC_PARAMETER,TASK_NODE,DESCRIPTION,TASK_SOURCE_NAME,USERPOSI_ID,BUSINESS_ID,SUGGESTION,EXEC_TIME,FLOW_STATUS,TASK_NODE_KEY,SUBMIT_TYPE 
) 
SELECT 
       sys_guid(),t.task_title,NULL,t.task_source,t.task_type, 
       /*到达时间*/to_date('2018-05-16 15:44:19', 'yyyy-mm-dd hh24:mi:ss'), 
       
       t.jump_url,t.sender,t.sender_id,NULL,NULL, 
       /*处理人ID*/(SELECT DISTINCT u.ID FROM Sys_User u WHERE u.account='ganhongquan' ), 
       /*处理人*/'甘宏权', 
       
       /*参数*/NULL,'转发',NULL, 
       '转发', 
       /*履职ID*/(SELECT sup.id FROM Sys_User_Posi sup LEFT JOIN sys_user su ON su.ID=sup.user_id WHERE su.account='ganhongquan' ), 
       
       t.business_id,'同意', 
       /*处理时间*/to_date('2018-05-16 16:02:53', 'yyyy-mm-dd hh24:mi:ss'),
       
       2,t.task_node_key,NULL 
FROM TASK_DONE t WHERE t.business_Id = /*业务ID*/'ff808081634f589501635dc53bc9322c' AND t.task_node='经办人归档' ;



INSERT INTO TASK_DONE( 
       ID,TASK_TITLE,TASK_ID,TASK_SOURCE,TASK_TYPE,ARRIVAL_TIME,JUMP_URL,SENDER,SENDER_ID,URGENCY,EXPIRATION_TIME,CONDUCTOR_ID,CONDUCTOR,DYNAMIC_PARAMETER,TASK_NODE,DESCRIPTION,TASK_SOURCE_NAME,USERPOSI_ID,BUSINESS_ID,SUGGESTION,EXEC_TIME,FLOW_STATUS,TASK_NODE_KEY,SUBMIT_TYPE 
) 
SELECT 
       sys_guid(),t.task_title,NULL,t.task_source,t.task_type, 
       /*到达时间*/to_date('2018-05-16 15:44:19', 'yyyy-mm-dd hh24:mi:ss'), 
       
       t.jump_url,t.sender,t.sender_id,NULL,NULL, 
       /*处理人ID*/(SELECT DISTINCT u.ID FROM Sys_User u WHERE u.account='wangshimin' ), 
       /*处理人*/'王仕民', 
       
       /*参数*/NULL,'转发',NULL, 
       '转发', 
       /*履职ID*/(SELECT sup.id FROM Sys_User_Posi sup LEFT JOIN sys_user su ON su.ID=sup.user_id WHERE su.account='wangshimin' ), 
       
       t.business_id,'同意', 
       /*处理时间*/to_date('2018-05-16 16:14:18', 'yyyy-mm-dd hh24:mi:ss'),
       
       2,t.task_node_key,NULL 
FROM TASK_DONE t WHERE t.business_Id = /*业务ID*/'ff808081634f589501635dc53bc9322c' AND t.task_node='经办人归档' ;



INSERT INTO TASK_DONE( 
       ID,TASK_TITLE,TASK_ID,TASK_SOURCE,TASK_TYPE,ARRIVAL_TIME,JUMP_URL,SENDER,SENDER_ID,URGENCY,EXPIRATION_TIME,CONDUCTOR_ID,CONDUCTOR,DYNAMIC_PARAMETER,TASK_NODE,DESCRIPTION,TASK_SOURCE_NAME,USERPOSI_ID,BUSINESS_ID,SUGGESTION,EXEC_TIME,FLOW_STATUS,TASK_NODE_KEY,SUBMIT_TYPE 
) 
SELECT 
       sys_guid(),t.task_title,NULL,t.task_source,t.task_type, 
       /*到达时间*/to_date('2018-05-16 15:44:19', 'yyyy-mm-dd hh24:mi:ss'), 
       
       t.jump_url,t.sender,t.sender_id,NULL,NULL, 
       /*处理人ID*/(SELECT DISTINCT u.ID FROM Sys_User u WHERE u.account='dengmin' ), 
       /*处理人*/'邓敏', 
       
       /*参数*/NULL,'转发',NULL, 
       '转发', 
       /*履职ID*/(SELECT sup.id FROM Sys_User_Posi sup LEFT JOIN sys_user su ON su.ID=sup.user_id WHERE su.account='dengmin' ), 
       
       t.business_id,'同意', 
       /*处理时间*/to_date('2018-05-16 16:11:39', 'yyyy-mm-dd hh24:mi:ss'),
       
       2,t.task_node_key,NULL 
FROM TASK_DONE t WHERE t.business_Id = /*业务ID*/'ff808081634f589501635dc53bc9322c' AND t.task_node='经办人归档' ;
~~~

~~~sql

INSERT INTO TASK_DONE( 
       ID,TASK_TITLE,TASK_ID,TASK_SOURCE,TASK_TYPE,ARRIVAL_TIME,JUMP_URL,SENDER,SENDER_ID,URGENCY,EXPIRATION_TIME,CONDUCTOR_ID,CONDUCTOR,DYNAMIC_PARAMETER,TASK_NODE,DESCRIPTION,TASK_SOURCE_NAME,USERPOSI_ID,BUSINESS_ID,SUGGESTION,EXEC_TIME,FLOW_STATUS,TASK_NODE_KEY,SUBMIT_TYPE 
) 
SELECT 
       sys_guid(),t.task_title,NULL,t.task_source,t.task_type, 
       /*到达时间*/to_date('2018-05-16 15:44:57', 'yyyy-mm-dd hh24:mi:ss'), 
       
       t.jump_url,t.sender,t.sender_id,NULL,NULL, 
       /*处理人ID*/(SELECT DISTINCT u.ID FROM Sys_User u WHERE u.account='liaozhiwei' ), 
       /*处理人*/'廖志伟', 
       
       /*参数*/NULL,'转发',NULL, 
       '转发', 
       /*履职ID*/(SELECT sup.id FROM Sys_User_Posi sup LEFT JOIN sys_user su ON su.ID=sup.user_id WHERE su.account='liaozhiwei' ), 
       
       t.business_id,'同意', 
       /*处理时间*/to_date('2018-05-16 15:57:26', 'yyyy-mm-dd hh24:mi:ss'),
       
       2,t.task_node_key,NULL 
FROM TASK_DONE t WHERE t.business_Id = /*业务ID*/'ff808081634f589501635dc32a363228' AND t.task_node='经办人归档' ;



INSERT INTO TASK_DONE( 
       ID,TASK_TITLE,TASK_ID,TASK_SOURCE,TASK_TYPE,ARRIVAL_TIME,JUMP_URL,SENDER,SENDER_ID,URGENCY,EXPIRATION_TIME,CONDUCTOR_ID,CONDUCTOR,DYNAMIC_PARAMETER,TASK_NODE,DESCRIPTION,TASK_SOURCE_NAME,USERPOSI_ID,BUSINESS_ID,SUGGESTION,EXEC_TIME,FLOW_STATUS,TASK_NODE_KEY,SUBMIT_TYPE 
) 
SELECT 
       sys_guid(),t.task_title,NULL,t.task_source,t.task_type, 
       /*到达时间*/to_date('2018-05-16 15:44:57', 'yyyy-mm-dd hh24:mi:ss'), 
       
       t.jump_url,t.sender,t.sender_id,NULL,NULL, 
       /*处理人ID*/(SELECT DISTINCT u.ID FROM Sys_User u WHERE u.account='yangqixiang' ), 
       /*处理人*/'杨启祥', 
       
       /*参数*/NULL,'转发',NULL, 
       '转发', 
       /*履职ID*/(SELECT sup.id FROM Sys_User_Posi sup LEFT JOIN sys_user su ON su.ID=sup.user_id WHERE su.account='yangqixiang' ), 
       
       t.business_id,'同意', 
       /*处理时间*/to_date('2018-05-16 16:01:16', 'yyyy-mm-dd hh24:mi:ss'),
       
       2,t.task_node_key,NULL 
FROM TASK_DONE t WHERE t.business_Id = /*业务ID*/'ff808081634f589501635dc32a363228' AND t.task_node='经办人归档' ;



INSERT INTO TASK_DONE( 
       ID,TASK_TITLE,TASK_ID,TASK_SOURCE,TASK_TYPE,ARRIVAL_TIME,JUMP_URL,SENDER,SENDER_ID,URGENCY,EXPIRATION_TIME,CONDUCTOR_ID,CONDUCTOR,DYNAMIC_PARAMETER,TASK_NODE,DESCRIPTION,TASK_SOURCE_NAME,USERPOSI_ID,BUSINESS_ID,SUGGESTION,EXEC_TIME,FLOW_STATUS,TASK_NODE_KEY,SUBMIT_TYPE 
) 
SELECT 
       sys_guid(),t.task_title,NULL,t.task_source,t.task_type, 
       /*到达时间*/to_date('2018-05-16 15:44:57', 'yyyy-mm-dd hh24:mi:ss'), 
       
       t.jump_url,t.sender,t.sender_id,NULL,NULL, 
       /*处理人ID*/(SELECT DISTINCT u.ID FROM Sys_User u WHERE u.account='weizengzhong' ), 
       /*处理人*/'韦増忠', 
       
       /*参数*/NULL,'转发',NULL, 
       '转发', 
       /*履职ID*/(SELECT sup.id FROM Sys_User_Posi sup LEFT JOIN sys_user su ON su.ID=sup.user_id WHERE su.account='weizengzhong' ), 
       
       t.business_id,'同意', 
       /*处理时间*/to_date('2018-05-16 15:59:37', 'yyyy-mm-dd hh24:mi:ss'),
       
       2,t.task_node_key,NULL 
FROM TASK_DONE t WHERE t.business_Id = /*业务ID*/'ff808081634f589501635dc32a363228' AND t.task_node='经办人归档' ;



INSERT INTO TASK_DONE( 
       ID,TASK_TITLE,TASK_ID,TASK_SOURCE,TASK_TYPE,ARRIVAL_TIME,JUMP_URL,SENDER,SENDER_ID,URGENCY,EXPIRATION_TIME,CONDUCTOR_ID,CONDUCTOR,DYNAMIC_PARAMETER,TASK_NODE,DESCRIPTION,TASK_SOURCE_NAME,USERPOSI_ID,BUSINESS_ID,SUGGESTION,EXEC_TIME,FLOW_STATUS,TASK_NODE_KEY,SUBMIT_TYPE 
) 
SELECT 
       sys_guid(),t.task_title,NULL,t.task_source,t.task_type, 
       /*到达时间*/to_date('2018-05-16 15:44:57', 'yyyy-mm-dd hh24:mi:ss'), 
       
       t.jump_url,t.sender,t.sender_id,NULL,NULL, 
       /*处理人ID*/(SELECT DISTINCT u.ID FROM Sys_User u WHERE u.account='yangxibin' ), 
       /*处理人*/'杨溪滨', 
       
       /*参数*/NULL,'转发',NULL, 
       '转发', 
       /*履职ID*/(SELECT sup.id FROM Sys_User_Posi sup LEFT JOIN sys_user su ON su.ID=sup.user_id WHERE su.account='yangxibin' ), 
       
       t.business_id,'同意', 
       /*处理时间*/to_date('2018-05-16 15:54:29', 'yyyy-mm-dd hh24:mi:ss'),
       
       2,t.task_node_key,NULL 
FROM TASK_DONE t WHERE t.business_Id = /*业务ID*/'ff808081634f589501635dc32a363228' AND t.task_node='经办人归档' ;



INSERT INTO TASK_DONE( 
       ID,TASK_TITLE,TASK_ID,TASK_SOURCE,TASK_TYPE,ARRIVAL_TIME,JUMP_URL,SENDER,SENDER_ID,URGENCY,EXPIRATION_TIME,CONDUCTOR_ID,CONDUCTOR,DYNAMIC_PARAMETER,TASK_NODE,DESCRIPTION,TASK_SOURCE_NAME,USERPOSI_ID,BUSINESS_ID,SUGGESTION,EXEC_TIME,FLOW_STATUS,TASK_NODE_KEY,SUBMIT_TYPE 
) 
SELECT 
       sys_guid(),t.task_title,NULL,t.task_source,t.task_type, 
       /*到达时间*/to_date('2018-05-16 15:44:57', 'yyyy-mm-dd hh24:mi:ss'), 
       
       t.jump_url,t.sender,t.sender_id,NULL,NULL, 
       /*处理人ID*/(SELECT DISTINCT u.ID FROM Sys_User u WHERE u.account='xinyonggang' ), 
       /*处理人*/'辛永刚', 
       
       /*参数*/NULL,'转发',NULL, 
       '转发', 
       /*履职ID*/(SELECT sup.id FROM Sys_User_Posi sup LEFT JOIN sys_user su ON su.ID=sup.user_id WHERE su.account='xinyonggang' ), 
       
       t.business_id,'同意', 
       /*处理时间*/to_date('2018-05-16 16:09:29', 'yyyy-mm-dd hh24:mi:ss'),
       
       2,t.task_node_key,NULL 
FROM TASK_DONE t WHERE t.business_Id = /*业务ID*/'ff808081634f589501635dc32a363228' AND t.task_node='经办人归档' ;



INSERT INTO TASK_DONE( 
       ID,TASK_TITLE,TASK_ID,TASK_SOURCE,TASK_TYPE,ARRIVAL_TIME,JUMP_URL,SENDER,SENDER_ID,URGENCY,EXPIRATION_TIME,CONDUCTOR_ID,CONDUCTOR,DYNAMIC_PARAMETER,TASK_NODE,DESCRIPTION,TASK_SOURCE_NAME,USERPOSI_ID,BUSINESS_ID,SUGGESTION,EXEC_TIME,FLOW_STATUS,TASK_NODE_KEY,SUBMIT_TYPE 
) 
SELECT 
       sys_guid(),t.task_title,NULL,t.task_source,t.task_type, 
       /*到达时间*/to_date('2018-05-16 15:44:57', 'yyyy-mm-dd hh24:mi:ss'), 
       
       t.jump_url,t.sender,t.sender_id,NULL,NULL, 
       /*处理人ID*/(SELECT DISTINCT u.ID FROM Sys_User u WHERE u.account='ganhongquan' ), 
       /*处理人*/'甘宏权', 
       
       /*参数*/NULL,'转发',NULL, 
       '转发', 
       /*履职ID*/(SELECT sup.id FROM Sys_User_Posi sup LEFT JOIN sys_user su ON su.ID=sup.user_id WHERE su.account='ganhongquan' ), 
       
       t.business_id,'同意', 
       /*处理时间*/to_date('2018-05-16 16:02:33', 'yyyy-mm-dd hh24:mi:ss'),
       
       2,t.task_node_key,NULL 
FROM TASK_DONE t WHERE t.business_Id = /*业务ID*/'ff808081634f589501635dc32a363228' AND t.task_node='经办人归档' ;



INSERT INTO TASK_DONE( 
       ID,TASK_TITLE,TASK_ID,TASK_SOURCE,TASK_TYPE,ARRIVAL_TIME,JUMP_URL,SENDER,SENDER_ID,URGENCY,EXPIRATION_TIME,CONDUCTOR_ID,CONDUCTOR,DYNAMIC_PARAMETER,TASK_NODE,DESCRIPTION,TASK_SOURCE_NAME,USERPOSI_ID,BUSINESS_ID,SUGGESTION,EXEC_TIME,FLOW_STATUS,TASK_NODE_KEY,SUBMIT_TYPE 
) 
SELECT 
       sys_guid(),t.task_title,NULL,t.task_source,t.task_type, 
       /*到达时间*/to_date('2018-05-16 15:44:57', 'yyyy-mm-dd hh24:mi:ss'), 
       
       t.jump_url,t.sender,t.sender_id,NULL,NULL, 
       /*处理人ID*/(SELECT DISTINCT u.ID FROM Sys_User u WHERE u.account='wangshimin' ), 
       /*处理人*/'王仕民', 
       
       /*参数*/NULL,'转发',NULL, 
       '转发', 
       /*履职ID*/(SELECT sup.id FROM Sys_User_Posi sup LEFT JOIN sys_user su ON su.ID=sup.user_id WHERE su.account='wangshimin' ), 
       
       t.business_id,'同意', 
       /*处理时间*/to_date('2018-05-16 16:14:08', 'yyyy-mm-dd hh24:mi:ss'),
       
       2,t.task_node_key,NULL 
FROM TASK_DONE t WHERE t.business_Id = /*业务ID*/'ff808081634f589501635dc32a363228' AND t.task_node='经办人归档' ;



INSERT INTO TASK_DONE( 
       ID,TASK_TITLE,TASK_ID,TASK_SOURCE,TASK_TYPE,ARRIVAL_TIME,JUMP_URL,SENDER,SENDER_ID,URGENCY,EXPIRATION_TIME,CONDUCTOR_ID,CONDUCTOR,DYNAMIC_PARAMETER,TASK_NODE,DESCRIPTION,TASK_SOURCE_NAME,USERPOSI_ID,BUSINESS_ID,SUGGESTION,EXEC_TIME,FLOW_STATUS,TASK_NODE_KEY,SUBMIT_TYPE 
) 
SELECT 
       sys_guid(),t.task_title,NULL,t.task_source,t.task_type, 
       /*到达时间*/to_date('2018-05-16 15:44:57', 'yyyy-mm-dd hh24:mi:ss'), 
       
       t.jump_url,t.sender,t.sender_id,NULL,NULL, 
       /*处理人ID*/(SELECT DISTINCT u.ID FROM Sys_User u WHERE u.account='dengmin' ), 
       /*处理人*/'邓敏', 
       
       /*参数*/NULL,'转发',NULL, 
       '转发', 
       /*履职ID*/(SELECT sup.id FROM Sys_User_Posi sup LEFT JOIN sys_user su ON su.ID=sup.user_id WHERE su.account='dengmin' ), 
       
       t.business_id,'同意', 
       /*处理时间*/to_date('2018-05-16 16:11:19', 'yyyy-mm-dd hh24:mi:ss'),
       
       2,t.task_node_key,NULL 
FROM TASK_DONE t WHERE t.business_Id = /*业务ID*/'ff808081634f589501635dc32a363228' AND t.task_node='经办人归档' ;
~~~

### 查询指定时间范围内的年月

~~~sql
--查询指定时间范围内的年月
SELECT TO_CHAR(add_months(to_date('2015-01', 'yyyy-mm'), ROWNUM - 1), 'YYYY-MM') as yearMonth FROM DUAL 
CONNECT BY ROWNUM <= (SELECT months_between(SYSDATE, to_date('2015-01','yyyy-mm')) from dual)+1 
~~~

### 递归查找父节点

~~~sql
WITH tab 
( 
     id, parent_id, code, name, tree_level, sort, creator_id, creator, create_date, creator_dept_id, 
     creator_dept, company_id, company_name, bu_id, bu_name 
) 
AS 
( 
     select 
         x.ID AS xID, x.parent_id AS xparentId, x.code AS xCode, x.NAME AS xName, x.tree_level AS xTreeLevel, x.SORT AS xSort, 
         x.creator_id AS xCreatorId, x.creator AS xCreator, x.create_date AS xCreatorDate, x.creator_dept_id AS xCreatorDeptId, 
         x.creator_dept AS xCreatorDept, x.company_id AS xCompanyId, x.company_name AS xCompanyName, x.bu_id AS xBuId, x.bu_name AS xBuName 
     from 
         sec_work_safety_standard x 
     where 
         x.code='2-1-2' 
     union ALL 
     select 
           b.ID AS bID, b.parent_id AS bparentId, b.code AS bCode, b.NAME AS bName, b.tree_level AS bTreeLevel, b.SORT AS bSort, 
           b.creator_id AS bCreatorId, b.creator AS bCreator, b.create_date AS bCreatorDate, b.creator_dept_id AS bCreatorDeptId, 
           b.creator_dept AS bCreatorDept, b.company_id AS bCompanyId, b.company_name AS bCompanyName, b.bu_id AS bBuId, b.bu_name AS bBuName 
     FROM 
            tab a, 
            sec_work_safety_standard b 
     where 
            a.parent_id=b.id 
) 
select tab.* from tab 
ORDER BY tab.SORT; 
~~~

### 根据父节点递归获取子节点

~~~sql
WITH w1( 
     id, parent_id, project_code, project_name, tree_level, sort, unit, amount, building_charge_price, building_charge_total, 
     facility_charge_price, facility_charge_total, install_charge_price, install_charge_total, independent_charge_price, independent_charge_total, 
     total, remark, creator_id, creator, create_date, creator_dept_id, creator_dept, company_id, company_name, bu_id, bu_name 
) 
AS(       
     SELECT   
            x.id, x.parent_id, x.project_code, x.project_name, x.tree_level, x.sort, x.unit, x.amount, x.building_charge_price, 
            x.building_charge_total, x.facility_charge_price, x.facility_charge_total, x.install_charge_price, x.install_charge_total, 
            x.independent_charge_price, x.independent_charge_total, x.total, x.remark, x.creator_id, x.creator, x.create_date, x.creator_dept_id, 
            x.creator_dept, x.company_id, x.company_name, x.bu_id, x.bu_name 
     FROM   
            inv_estimate_project x 
     WHERE   
            x.id = 'dff13022-a842-42e2-a92b-700bce2dabfe' 
     UNION ALL   
           SELECT 
              y.id, y.parent_id, y.project_code, y.project_name, y.tree_level, y.sort, y.unit, y.amount, y.building_charge_price, 
              y.building_charge_total, y.facility_charge_price, y.facility_charge_total, y.install_charge_price, y.install_charge_total, 
              y.independent_charge_price, y.independent_charge_total, y.total, y.remark, y.creator_id, y.creator, y.create_date, y.creator_dept_id, 
              y.creator_dept, y.company_id, y.company_name, y.bu_id, y.bu_name 
           FROM   
              inv_estimate_project y JOIN w1 ON y.parent_id= w1.id  
) 
SELECT 
     w1.* 
FROM 
     w1
WHERE
     w1.ID  != 'dff13022-a842-42e2-a92b-700bce2dabfe'
ORDER BY
     w1.sort; 
~~~

### 多维分组

~~~sql
select 
	decode(grouping(ci.name) + grouping(ci.total_price), 1, '结算比例：', 2, '统计合同金额：', ci.name) name, 
	decode(grouping(ci.name) + grouping(ci.total_price), 1, 'a', 2, 'b', ci.total_price) total_price, 
	decode(grouping(ci.name) + grouping(ci.total_price), 1, '总计：', 2, '统计结算金额：', ppv.PROJECT_NAME) PROJECT_NAME, 
	sum(ppv.EMPLOYER_APPROVED_AMOUNT) 
from contr_contract_info ci 
left join contr_progress_payment pp on ci.id = pp.contract_id 
left join contr_progress_payment_voucher ppv on pp.id = ppv.progress_payment_id 
left join contr_progress_payment_voucher ppvc on ppv.progress_payment_id = ppvc.progress_payment_id 
where 1=1 
and ci.flow_status = 2 
and ci.invalid = 0 
and pp.flow_status = 2 
and pp.invalid = 0 
and ppv.sort_number = 3101 
and ppvc.sort_number = 3000 
group by rollup(ci.name, ci.total_price, ppv.PROJECT_NAME, ppv.EMPLOYER_APPROVED_AMOUNT);
~~~



<br/><br/><br/>

---

