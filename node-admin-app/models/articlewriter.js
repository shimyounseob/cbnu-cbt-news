module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "article_writers",
        {
            article_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: "기사 ID",
                references: {
                    model: "article",
                    key: "id",
                },
            },
            writer_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: "기자 ID",
                references: {
                    model: "writer",
                    key: "id",
                },
            },
            role: {
                type: DataTypes.ENUM("main", "sub"),
                allowNull: false,
                comment: "기자 역할 (메인 기자 또는 서브 기자)",
            },
        },
        {
            sequelize,
            tableName: "article_writers",
            timestamps: false,
            comment: "기사와 기자의 관계 테이블",
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "article_id" }, { name: "writer_id" }],
                },
            ],
        }
    );
};
