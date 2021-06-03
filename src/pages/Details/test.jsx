<Drawer
  className="drawer"
  placement="right"
  closable={false}
  onClose={onClose}
  visible={isOpen}
  mask={false}
  width={500}
  style={{
    position: "absolute",
    top: "64px",
    height: `calc(100vh - 64px - 70px )`,
  }}>

</Drawer>;
  <div className="play-list">
    <div className="title">
      <Tabs />
      <div className="count">
        <span className="total">总{(playList && playList.length) || 0}首</span>
        <div className="c-r">
          <div>
            <PlusSquareOutlined />
            <span>收藏全部</span>
          </div>
          <div>
            <DeleteOutlined />
            <span>清空</span>
          </div>
        </div>
      </div>
    </div>
    <Divider />
    <div className="list">
      <Table
        dataSource={playList}
        pagination={false}
        showHeader={false}
        rowKey={(record) => record.id}
        columns={columns}
        onRow={(record, index) => ({
          onDoubleClick: (event) => rowClick(record, index),
        })}
      />
    </div>
  </div>;