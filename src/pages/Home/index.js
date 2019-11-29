import React, { Component, Fragment } from "react"
import { Table, Button, Divider, Form, Pagination, Radio, Modal } from 'antd';
import { booksListApi, pagingListApi, DeteteValueApi, conditionApi } from "@api/index"
import { HomeStyled } from "./styled"
import FromList from "./FormList/index"
import EditFrom from "./EditFrom/index"
import NewlyAdded from "./NewlyAdded"
import FromOneList from "./FromOneList"
import { ADANDONVALUE } from "@api/Home.js"

import locale from 'antd/es/date-picker/locale/zh_CN'
@Form.create()
class Home extends Component {

    constructor() {
        super()
        this.state = {
            data: [
            ],
            sortedInfo: null,
            filteredInfo: null,
            currPage: 1,
            totalCount: 10,
            flag: false,
            arrId: [],
            visible: false,
            EditFromValue: {},
            NewlyAdded: false,
            visibleNew: false,
            selectedRowKeys: [],
            ruleType: "",//规则类型
            ruleImp: '',//规则级别
            gzVersion: '',//版本
            FromList: {},
            DeletedBool: false,//删除框的布尔值
            DeletedId: '',//删除的id
            TSBNSCBool: false//提示用户不能删除的
        }
    }
    onSelectChange = selectedRowKeys => {
        console.log('点击前面的选框 ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    render() {
        let { sortedInfo, filteredInfo, loading } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const columns = [
            {
                title: '规则号',
                dataIndex: 'ruleSeq',
                key: 'ruleSeq',
                align: 'center',
                sortOrder: sortedInfo.columnKey === 'ruleSeq' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '规则描述',
                dataIndex: 'ruleDesc',
                key: 'ruleDesc',
                align: 'center',
                sortOrder: sortedInfo.columnKey === 'ruleDesc' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '中文表名',
                dataIndex: 'srcTabNameCn',
                key: 'srcTabNameCn',
                align: 'center',
                sortOrder: sortedInfo.columnKey === 'srcTabNameCn' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '英文表名',
                dataIndex: 'srcTabNameEn',
                key: 'srcTabNameEn',
                align: 'center',
                filteredValue: filteredInfo.address || null,
                sortOrder: sortedInfo.columnKey === 'srcTabNameEn' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '目标字段',
                dataIndex: 'dataFieldCode',
                key: 'dataFieldCode',
                align: 'center',
                filteredValue: filteredInfo.address || null,
                sortOrder: sortedInfo.columnKey === 'dataFieldCode' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '规则类型',
                locale:{filterConfirm: '确定',filterReset: '重置'},
                dataIndex: 'ruleType',
                key: 'ruleType',
                align: 'center',
                filters: [{ text: '重点', value: '重点' }, { text: '有效性', value: '有效性' }],
                // filteredValue: filteredInfo.ruleType || null,
                filterMultiple: false,
                // onFilter: this.LevelHandlerFilter.bind(this),
                onFilter: (value, record) => record.ruleType.indexOf(value) === 0,
                // sortOrder: sortedInfo.columnKey === 'ruleType' && sortedInfo.order,
                // ellipsis: true,
                
            },
            {
                title: '规则级别',
                dataIndex: 'ruleImp',
                key: 'ruleImp',
                align: 'center',
                // filters: [{ text: '必检规则', value: '必检规则' }, { text: '关键规则', value: '关键规则' }],
                // filteredValue: filteredInfo.address || null,
                // onFilter: this.TagsHandlerFilter.bind(this),
                // filterMultiple: false,
                // sortOrder: sortedInfo.columnKey === 'ruleImp' && sortedInfo.order,
                // ellipsis: true,
            },
            {
                title: '标准类型',
                dataIndex: 'standardType',
                key: 'standardType',
                align: 'center',
                filters: [{ text: 'London', value: 'London' }, { text: 'New York', value: 'New York' }],
                // filteredValue: filteredInfo.address || null,
                onFilter: this.TypeHandlerFilter.bind(this),
                filterMultiple: false,
                // sortOrder: sortedInfo.columnKey === 'standardType' && sortedInfo.order,
                // ellipsis: true,
            },
            // {
            //     title: '版本',
            //     dataIndex: 'gzVersion',
            //     key: 'gzVersion',
            //     align: 'center',
            //     filters: [{ text: '自有v1.0', value: '自有v1.0' }, { text: 'EAST4.0', value: 'EAST4.0' }],
            //     filteredValue: filteredInfo.address || null,
            //     onFilter: this.StandardHandlerFilter.bind(this),
            //     filterMultiple: false,
            //     sortOrder: sortedInfo.columnKey === 'gzVersion' && sortedInfo.order,
            //     ellipsis: true,
            // },
            {
                title: '是否自有',
                dataIndex: 'Have',
                key: 'Have',
                align: 'center',
                filters: [{ text: '是', value: '是' }, { text: '否', value: '否' }],
                filteredValue: filteredInfo.address || null,
                onFilter: this.HaveHandlerFilter.bind(this),
                filterMultiple: false,
                sortOrder: sortedInfo.columnKey === 'Type' && sortedInfo.order,
                ellipsis: true,
                
            },
            {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                width: "140px",
                align: 'center',
                ellipsis: true,
                render: (text, record) => {
                    if (record.standardType == "自有") {
                        return <span>
                            <a onClick={this.EditHandlerValue.bind(this, text, record)}>编辑</ a>
                            <Divider type="vertical" />
                            <a onClick={this.AbolishHandlerValue.bind(this, record)}>废除</ a>
                            <Divider type="vertical" />
                            <a onClick={this.DeleteHandlerValue.bind(this, record)}>删除</ a>
                        </span>
                    } else {
                        return <span>
                            <a onClick={this.EditHandlerValue.bind(this, text, record)}
                                style={{ color: '#f1f1f1', pointerEvents: 'none' }}
                            >编辑</ a>
                            <Divider type="vertical" />
                            <a onClick={this.AbolishHandlerValue.bind(this, record)}>废除</ a>
                            <Divider type="vertical" />
                            <a onClick={this.DeleteHandlerValue.bind(this, record)}>删除</ a>
                        </span>
                    }
                },
            }

        ];

        return (
            <Fragment>
                <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                    当前位置：首页-规则管理
                </div>
                <div style={{ backgroundColor: "#f4f4f4", marginBottom: "20px", margin: '10px 0', padding: 10 }}>
                    <FromList
                        HandleFromList={this.FromListValue.bind(this)}
                        NewlyAddedFromList={this.NewlyAddedFromList.bind(this)}
                        NewFromListOne={this.NewFromListOne.bind(this)}
                        ArrayDelete={this.ArrayDelete.bind(this)}
                        clearClickValue={this.clearClickValue.bind(this)}
                    ></FromList>
                </div>
                <HomeStyled style={{ padding: 10 }}>
                    <Table columns={columns}
                        dataSource={this.state.data}
                        onChange={this.handleChange.bind(this)}
                        style={{ backgroundColor: '#fff' }}
                        rowSelection={rowSelection}
                        locale={locale}
                    >
                    </Table>
                    <div>
                        <Pagination showQuickJumper
                            defaultCurrent={this.state.currPage} total={this.state.totalCount}
                            onChange={this.onChange.bind(this)} />
                    </div>
                </HomeStyled>
                <div>
                    <Modal
                        title="Basic Modal"
                        visible={this.state.visible}
                        onOk={this.handleOk.bind(this)}
                        onCancel={this.handleCancel.bind(this)}
                    >
                        <EditFrom EditFromList={this.state.EditFromValue} EditHandler={this.CancelHandler.bind(this)}></EditFrom>
                    </Modal>
                </div>

                <div>
                    <Modal
                        title="新增表单"
                        visible={this.state.NewlyAdded}
                        onOk={this.handleOk.bind(this)}
                        onCancel={this.NewFromList.bind(this)}
                    >
                        <NewlyAdded></NewlyAdded>
                    </Modal>
                </div>

                <div style={{ width: '100px' }}>
                    <Modal
                        visible={this.state.visibleNew}
                        title="新增规则"
                        onOk={this.handleOk.bind(this)}
                        onCancel={this.handleCancel.bind(this)}
                        footer={[
                            <Button key="back" onClick={this.handleCancel.bind(this)}>
                                Return
                            </Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk.bind(this)}>
                                Submit
                            </Button>,
                        ]}
                    >
                        <FromOneList
                            DetermineClick={this.DetermineClick.bind(this)}
                        />
                    </Modal>
                </div>
                <div>
                    <Modal
                        title="删除框"
                        visible={this.state.DeletedBool}
                        onOk={this.handleOk.bind(this)}
                        onCancel={this.handleCancel.bind(this)}
                    >
                        <p style={{ fontSize: '16px' }} >您确认要删除该条规则吗</p>
                        <Button type="primary" style={{ marginRight: '10px' }} onClick={this.QRDelete.bind(this)}>确定</Button>
                        <Button>取消</Button>
                    </Modal>
                    <Modal
                        title="提示框"
                        visible={this.state.TSBNSCBool}
                        onOk={this.handleOk.bind(this)}
                        onCancel={this.handleCancel.bind(this)}
                    >
                        <p style={{ fontSize: '16px' }} >对不起该条规则不是您自有规则不能删除。</p>
                        <Button type="primary" style={{ marginRight: '10px' }} onClick={this.TSBUSCx.bind(this)}>确定</Button>

                    </Modal>

                </div>
            </Fragment >

        )
    }
    // 提示用户不能删除非自有
    TSBUSCx() {
        this.setState({
            TSBNSCBool: false
        })
    }
    // 确认删除规则
    async QRDelete() {
        let arr = []
        let id = this.state.DeletedId
        arr.push(id)
        let data = await DeteteValueApi(arr)
        console.log(data, "删除")
        if (data.msg == "成功") {
            this.HandlerValue()
        }
        this.setState({
            DeletedBool: false
        })
    }
    // 关闭弹窗
    DetermineClick() {
        this.setState({
            visibleNew: false
        })
    }
    // 清除后重新加载数据
    clearClickValue() {
        this.HandlerValue()
    }
    componentDidMount() {
        this.HandlerValue()
    }
    // 数组内的批量删除
    async ArrayDelete() {
        console.log(this.state.selectedRowKeys)
        let selectedRowKeys = this.state.selectedRowKeys
        let DeleteFrom = this.state.data
        let DeleteId = []
        for (var i = 0; i < selectedRowKeys.length; i++) {
            let index = selectedRowKeys[i]
            DeleteId.push(DeleteFrom[index].id)
        }
        console.log(DeleteId, "DeleteId")

        // console.log(DeleteIndex,"buhao")
        let data = await DeteteValueApi(DeleteId)
        console.log(data)
        if (data.code == 0) {
            // this.forceUpdate()
            this.HandlerValue()
        }
    }
    async HandlerValue() {
        let data = await booksListApi()
        console.log(data)
        for (var i = 0; i < data.data.list.length; i++) {
            data.data.list[i].bool = true
        }
        this.setState({
            data: data.data.list,
            currPage: data.data.currPage,
            totalCount: data.data.totalCount
        })

    }
    // 新增规则
    NewFromListOne() {
        console.log(111)
        this.setState({
            visibleNew: true,
            DeletedBool: false
        })
    }
    // 修改后关闭弹窗
    CancelHandler(val) {
        console.log(val)
        let FromList = this.state.data
        for (var i = 0; i < FromList.length; i++) {
            if (FromList[i].id == val.id) {
                FromList[i] = val
            }
        }
        this.setState({
            visible: false,
            NewlyAdded: false,
            data: FromList
        })

    }
    // 关闭弹窗
    handleCancel() {
        this.setState({
            visible: false,
            NewlyAdded: false,
            visibleNew: false,
            DeletedBool: false,
            TSBNSCBool: false
        })
    }
    // handleOk 确定修改
    handleOk() {
        this.setState({
            visible: false,
            NewlyAdded: false,
            visibleNew: false,
            DeletedBool: false,
            TSBNSCBool: false
        })
    }
    // 编辑
    EditHandlerValue(text, record) {
        console.log(record, "编辑")
        this.setState({
            visible: true,
            EditFromValue: record
        })
    }
    // 废掉
    async AbolishHandlerValue(record) {
        console.log(record, "废掉")
        let Abandon = await ADANDONVALUE(record.id)
        console.log(Abandon, "Abandon")
        this.HandlerValue()
    }
    // 删除
    DeleteHandlerValue(record) {
        console.log(record.standardType, "standardType")
        if (record.standardType == "自有") {
            this.setState({
                DeletedBool: true,
                DeletedId: record.id
            })
        } else {
            this.setState({
                TSBNSCBool: true
            })
        }


    }
    // 规则级别筛选
    TagsHandlerFilter(record, text) {
        let Array = this.state.data
        let arr = this.state.arrId
        for (var i = 0; i < Array.length; i++) {
            if (record == 1) {
                Array[i].bool = true
                arr.push(Array[i].id)
            } else if (record == 0) {
                Array[i].bool = false
            }
        }
        this.setState({
            data: Array,
            arrId: arr
        })
    }
    // 标准类型筛选
    TypeHandlerFilter(value, record) {
        console.log(value, "标准类型")
    }
    // 版本筛选
    StandardHandlerFilter(value, record) {
        console.log(111)
        console.log("版本筛选", value)
    }
    // 是否自有
    HaveHandlerFilter(value, record) {
        console.log(value, "是否自有")
    }
    // 规则类型筛选
    LevelHandlerFilter(value, record) {
        // let LevelHandler={}
        // LevelHandler.level = value
        this.setState({
            ruleType: value
        })
        console.log(value, "规则类型筛选")
    }
    // 分页
    async onChange(pageNumber) {
        let FromList = this.state.FromList
        FromList.pageNumber = pageNumber
        FromList.dataFieldCode = ""
        FromList.ruleDesc = ""
        FromList.ruleImp = ""
        FromList.ruleSeq = ""
        FromList.srcTabNameCn = ""
        FromList.srcTabNameEn = ""
        let data = await pagingListApi(FromList)
        console.log(data)
        this.setState({
            data: data.data.list,
            currPage: data.data.currPage
        })
    }
    // 筛选传过来的数据  
    async FromListValue(val) {

        let FromList = this.state.FromList
        FromList.dataFieldCode = val.dataFieldCode
        FromList.ruleDesc = val.ruleDesc
        FromList.ruleImp = val.ruleImp
        FromList.ruleSeq = val.ruleSeq
        FromList.srcTabNameCn = val.srcTabNameCn
        FromList.srcTabNameEn = val.srcTabNameEn
        console.log(FromList, "FromList")
        let data = await conditionApi(val)
        console.log(data)
        this.setState({
            data: data.data.list,
            currPage: data.data.currPage,
            totalCount: data.data.totalCount,
            FromList: FromList
        })
    }
    // 新增表单
    NewlyAddedFromList() {
        this.setState({
            NewlyAdded: true
        })
    }
    // 新增表单点X关闭
    NewFromList() {
        this.setState({
            NewlyAdded: false
        })
    }

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', filters);

        // if (filters.ruleType[0]) {
        //     this.setState({
        //         ruleType: filters.ruleType[0],
        //         ruleImp: '',
        //         gzVersion: ''
        //     }, () => {
        //         console.log(this.state.ruleType)
        //     })
        // } else if (filters.ruleImp[0]) {
        //     this.setState({
        //         ruleType: '',
        //         ruleImp: filters.ruleImp[0],
        //         gzVersion: ''
        //     }, () => {
        //         console.log(this.state.ruleImp)
        //     })
        // } else if (filters.gzVersion[0]) {
        //     this.setState({
        //         ruleType: '',
        //         ruleImp: '',
        //         gzVersion: filters.gzVersion[0]
        //     })
        // }
        console.log(filters, 22)
        console.log(sorter, 33)
        // this.setState({
        //   filteredInfo: filters,
        //   sortedInfo: sorter,
        // });
    };


}

export default Home